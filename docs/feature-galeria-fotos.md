# 📸 Feature: Galeria de Fotos dos Eventos

**Status**: Planejado  
**Prioridade**: Média  
**Estimativa**: 3-5 dias  
**Data de Criação**: 30/01/2025

---

## 📋 Visão Geral

Implementar funcionalidade que permita aos participantes dos eventos musicais enviarem fotos dos ensaios, práticas e reuniões. As fotos ficarão organizadas por evento e disponíveis para visualização por todos os usuários.

---

## 🎯 Objetivos

### Principais
- Permitir upload de fotos pelos participantes
- Organizar fotos por evento
- Visualizar galeria de fotos de cada evento
- Garantir segurança e moderação de conteúdo

### Secundários
- Otimizar imagens automaticamente
- Permitir download de álbuns
- Sistema de curtidas/reações
- Compartilhamento nas redes sociais

---

## ✨ Funcionalidades

### MVP (Versão 1.0)

#### 1. Upload de Fotos
- **Interface**: Modal com drag-and-drop ou seleção de arquivos
- **Localização**: Botão "Adicionar Fotos" no modal de detalhes do evento
- **Limites**: 
  - Máximo 5 fotos por usuário por evento
  - Tamanho máximo: 5MB por foto
  - Formatos: JPG, PNG, WEBP
- **Metadados Salvos**:
  - ID do evento
  - Timestamp do upload
  - ID do usuário (anônimo ou autenticado)
  - URL da imagem no Storage
  - Thumbnail (gerado automaticamente)

#### 2. Autenticação
- **Método Inicial**: Firebase Auth Anônimo
- **Identificação**: Cada dispositivo recebe um UID anônimo
- **Limite**: 5 fotos por UID por evento
- **Migração Futura**: Google Sign-in ou Email/Senha

#### 3. Galeria de Fotos
- **Layout**: Grid responsivo (2 cols mobile, 3 cols tablet, 4 cols desktop)
- **Localização**: Aba "Fotos" no modal do evento
- **Ordenação**: Mais recentes primeiro
- **Interação**: Click abre lightbox/modal com zoom
- **Loading**: Skeleton/shimmer durante carregamento

#### 4. Visualização
- **Lightbox**: Modal fullscreen com navegação
- **Controles**: 
  - Anterior/Próxima
  - Fechar
  - Download (opcional)
  - Compartilhar (opcional)

---

## 🏗️ Arquitetura Técnica

### Estrutura de Arquivos

```
src/
├── services/
│   └── firebase/
│       ├── config.ts           # Configuração Firebase
│       ├── auth.service.ts     # Autenticação
│       ├── storage.service.ts  # Upload/Download
│       └── firestore.service.ts # Metadados
├── components/features/
│   ├── PhotoUpload.tsx         # Componente de upload
│   ├── PhotoGallery.tsx        # Grid de fotos
│   └── PhotoLightbox.tsx       # Visualização fullscreen
├── hooks/
│   ├── usePhotoUpload.ts       # Hook para upload
│   └── useEventPhotos.ts       # Hook para buscar fotos
└── types/
    └── photo.ts                # Tipos TypeScript
```

### Data Models

```typescript
// src/types/photo.ts
export interface EventPhoto {
  id: string;
  eventId: string;
  userId: string;
  imageUrl: string;
  thumbnailUrl: string;
  uploadedAt: Timestamp;
  fileName: string;
  fileSize: number;
  approved?: boolean; // Para moderação futura
}

export interface PhotoUploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}
```

### Firestore Structure

```
/events/{eventId}/photos/{photoId}
  - eventId: string
  - userId: string
  - imageUrl: string
  - thumbnailUrl: string
  - uploadedAt: timestamp
  - fileName: string
  - fileSize: number
  - approved: boolean
```

### Storage Structure

```
/events/{eventId}/{userId}/{timestamp}_{filename}
/events/{eventId}/{userId}/thumbs/{timestamp}_{filename}
```

---

## 📦 Dependências Necessárias

```json
{
  "dependencies": {
    "firebase": "^10.8.0",
    "react-dropzone": "^14.2.3",
    "react-image-lightbox": "^5.1.4",
    "browser-image-compression": "^2.0.2"
  },
  "devDependencies": {
    "@types/react-image-lightbox": "^5.1.4"
  }
}
```

Instalar com:
```bash
npm install firebase react-dropzone react-image-lightbox browser-image-compression
npm install -D @types/react-image-lightbox
```

---

## 🔨 Implementação - Passo a Passo

### Fase 1: Setup Firebase (4 horas)

#### 1.1 Criar Projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome: `agenda-musical-uruguaiana`
4. Desative o Google Analytics (opcional para MVP)

#### 1.2 Ativar Serviços

**Authentication:**
1. Authentication → Get Started
2. Sign-in method → Anonymous → Enable

**Storage:**
1. Storage → Get Started
2. Escolha local: `southamerica-east1` (São Paulo)
3. Modo produção com regras de segurança

**Firestore:**
1. Firestore Database → Create Database
2. Modo produção
3. Local: `southamerica-east1`

#### 1.3 Configurar Projeto Web

1. Project Settings → Adicionar app → Web
2. Nome: `Agenda Musical Web`
3. Copiar configuração

#### 1.4 Adicionar Variáveis de Ambiente

Criar arquivo `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Adicionar ao `.gitignore`:
```
.env.local
```

#### 1.5 Security Rules

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /events/{eventId}/{userId}/{allPaths=**} {
      // Permitir leitura pública
      allow read: if true;
      
      // Apenas donos podem fazer upload
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId}/photos/{photoId} {
      // Permitir leitura pública
      allow read: if true;
      
      // Apenas usuários autenticados podem criar
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid
                    && request.resource.data.eventId == eventId;
      
      // Apenas dono pode deletar
      allow delete: if request.auth != null
                    && resource.data.userId == request.auth.uid;
    }
  }
}
```

---

### Fase 2: Código Base (6 horas)

#### 2.1 Configuração Firebase

```typescript
// src/services/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
```

#### 2.2 Serviço de Autenticação

```typescript
// src/services/firebase/auth.service.ts
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';

export const ensureAuth = async () => {
  if (!auth.currentUser) {
    const result = await signInAnonymously(auth);
    return result.user;
  }
  return auth.currentUser;
};

export const getCurrentUserId = () => {
  return auth.currentUser?.uid || null;
};

// Listener para mudanças de autenticação
export const onAuthChange = (callback: (userId: string | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user?.uid || null);
  });
};
```

#### 2.3 Serviço de Storage

```typescript
// src/services/firebase/storage.service.ts
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';
import { ensureAuth } from './auth.service';
import imageCompression from 'browser-image-compression';

export const uploadEventPhoto = async (
  eventId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ url: string; thumbnailUrl: string }> => {
  // Garantir autenticação
  const user = await ensureAuth();
  
  // Comprimir imagem principal
  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  });

  // Gerar thumbnail
  const thumbnail = await imageCompression(file, {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 400,
    useWebWorker: true
  });

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${timestamp}_${sanitizedName}`;

  // Upload imagem principal
  const imageRef = ref(storage, `events/${eventId}/${user.uid}/${filename}`);
  const uploadTask = uploadBytesResumable(imageRef, compressed);

  // Upload thumbnail em paralelo
  const thumbRef = ref(storage, `events/${eventId}/${user.uid}/thumbs/${filename}`);
  const thumbUpload = uploadBytesResumable(thumbRef, thumbnail);

  // Monitorar progresso
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      reject,
      async () => {
        try {
          const [url, thumbnailUrl] = await Promise.all([
            getDownloadURL(uploadTask.snapshot.ref),
            getDownloadURL(thumbRef)
          ]);
          resolve({ url, thumbnailUrl });
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export const deleteEventPhoto = async (
  eventId: string,
  userId: string,
  filename: string
): Promise<void> => {
  const imageRef = ref(storage, `events/${eventId}/${userId}/${filename}`);
  const thumbRef = ref(storage, `events/${eventId}/${userId}/thumbs/${filename}`);
  
  await Promise.all([
    deleteObject(imageRef),
    deleteObject(thumbRef)
  ]);
};
```

#### 2.4 Serviço Firestore

```typescript
// src/services/firebase/firestore.service.ts
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { EventPhoto } from '@/types/photo';

export const savePhotoMetadata = async (
  data: Omit<EventPhoto, 'id' | 'uploadedAt'>
): Promise<string> => {
  const photosRef = collection(db, 'events', data.eventId, 'photos');
  const docRef = await addDoc(photosRef, {
    ...data,
    uploadedAt: Timestamp.now()
  });
  return docRef.id;
};

export const getEventPhotos = async (eventId: string): Promise<EventPhoto[]> => {
  const photosRef = collection(db, 'events', eventId, 'photos');
  const q = query(photosRef, orderBy('uploadedAt', 'desc'));
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    uploadedAt: doc.data().uploadedAt.toDate()
  } as EventPhoto));
};

export const getUserPhotoCount = async (
  eventId: string, 
  userId: string
): Promise<number> => {
  const photosRef = collection(db, 'events', eventId, 'photos');
  const q = query(photosRef, where('userId', '==', userId));
  
  const snapshot = await getDocs(q);
  return snapshot.size;
};

export const deletePhotoMetadata = async (
  eventId: string,
  photoId: string
): Promise<void> => {
  const photoRef = doc(db, 'events', eventId, 'photos', photoId);
  await deleteDoc(photoRef);
};
```

---

### Fase 3: Componentes React (8 horas)

#### 3.1 PhotoUpload Component

```typescript
// src/components/features/PhotoUpload.tsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadEventPhoto } from '@/services/firebase/storage.service';
import { savePhotoMetadata, getUserPhotoCount } from '@/services/firebase/firestore.service';
import { getCurrentUserId } from '@/services/firebase/auth.service';
import { PhotoUploadProgress } from '@/types/photo';

interface Props {
  eventId: string;
  maxPhotos?: number;
  onSuccess?: () => void;
}

export const PhotoUpload: React.FC<Props> = ({ 
  eventId, 
  maxPhotos = 5,
  onSuccess 
}) => {
  const [uploads, setUploads] = useState<PhotoUploadProgress[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    // Validar rejeições
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles[0].errors.map((e: any) => e.message).join(', ');
      setError(errors);
      return;
    }

    // Verificar limite de fotos do usuário
    const userId = getCurrentUserId();
    if (!userId) {
      setError('Erro de autenticação. Recarregue a página.');
      return;
    }

    const currentCount = await getUserPhotoCount(eventId, userId);
    if (currentCount + acceptedFiles.length > maxPhotos) {
      setError(`Você já enviou ${currentCount} fotos. Limite: ${maxPhotos} por evento.`);
      return;
    }

    // Processar uploads
    for (const file of acceptedFiles) {
      const uploadItem: PhotoUploadProgress = {
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      };

      setUploads(prev => [...prev, uploadItem]);

      try {
        // Upload para Storage
        const { url, thumbnailUrl } = await uploadEventPhoto(
          eventId,
          file,
          (progress) => {
            setUploads(prev =>
              prev.map(u =>
                u.fileName === file.name ? { ...u, progress } : u
              )
            );
          }
        );

        // Salvar metadados no Firestore
        await savePhotoMetadata({
          eventId,
          userId,
          imageUrl: url,
          thumbnailUrl,
          fileName: file.name,
          fileSize: file.size
        });

        // Marcar como completo
        setUploads(prev =>
          prev.map(u =>
            u.fileName === file.name ? { ...u, status: 'complete', progress: 100 } : u
          )
        );

        // Callback de sucesso
        onSuccess?.();

        // Limpar após 3 segundos
        setTimeout(() => {
          setUploads(prev => prev.filter(u => u.fileName !== file.name));
        }, 3000);

      } catch (error: any) {
        console.error('Upload error:', error);
        setUploads(prev =>
          prev.map(u =>
            u.fileName === file.name
              ? { ...u, status: 'error', error: error.message }
              : u
          )
        );
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: maxPhotos
  });

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-[#033d60] bg-blue-50'
            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
        <p className="text-sm font-medium text-slate-700">
          {isDragActive
            ? 'Solte as fotos aqui...'
            : 'Arraste fotos ou clique para selecionar'}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Máximo {maxPhotos} fotos • JPG, PNG ou WEBP • Até 5MB cada
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((upload, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              {upload.status === 'complete' && (
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
              )}
              {upload.status === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              )}
              {upload.status === 'uploading' && (
                <div className="w-5 h-5 border-2 border-[#033d60] border-t-transparent rounded-full animate-spin shrink-0" />
              )}

              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {upload.fileName}
                </p>
                {upload.status === 'uploading' && (
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-[#033d60] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                )}
                {upload.status === 'error' && upload.error && (
                  <p className="text-xs text-red-500 mt-1">{upload.error}</p>
                )}
                {upload.status === 'complete' && (
                  <p className="text-xs text-green-600 mt-1">Upload concluído!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

#### 3.2 PhotoGallery Component

```typescript
// src/components/features/PhotoGallery.tsx
import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import { getEventPhotos } from '@/services/firebase/firestore.service';
import { EventPhoto } from '@/types/photo';
import { ImageIcon } from 'lucide-react';
import 'react-image-lightbox/style.css';

interface Props {
  eventId: string;
  refreshTrigger?: number; // Para forçar atualização após upload
}

export const PhotoGallery: React.FC<Props> = ({ eventId, refreshTrigger }) => {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    loadPhotos();
  }, [eventId, refreshTrigger]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const data = await getEventPhotos(eventId);
      setPhotos(data);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div
            key={i}
            className="aspect-square bg-slate-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Empty State
  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <ImageIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">
          Nenhuma foto ainda
        </h3>
        <p className="text-sm text-slate-500">
          Seja o primeiro a compartilhar fotos deste evento!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Photo Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-90 transition-opacity group relative"
            >
              <img
                src={photo.thumbnailUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          mainSrc={photos[lightboxIndex].imageUrl}
          nextSrc={photos[(lightboxIndex + 1) % photos.length]?.imageUrl}
          prevSrc={photos[(lightboxIndex + photos.length - 1) % photos.length]?.imageUrl}
          onCloseRequest={() => setLightboxIndex(null)}
          onMovePrevRequest={() =>
            setLightboxIndex((lightboxIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % photos.length)
          }
          imageTitle={`Foto ${lightboxIndex + 1} de ${photos.length}`}
          imageCaption={new Date(photos[lightboxIndex].uploadedAt).toLocaleDateString('pt-BR')}
        />
      )}
    </>
  );
};
```

---

### Fase 4: Integração (2 horas)

#### 4.1 Modificar EventCard.tsx

```typescript
// Adicionar no início do componente EventCard
const [activeTab, setActiveTab] = useState<'info' | 'photos'>('info');
const [photoRefreshKey, setPhotoRefreshKey] = useState(0);

// No modal, adicionar abas:
<div className="sticky top-0 bg-white border-b border-slate-200 z-10">
  <div className="flex">
    <button
      onClick={() => setActiveTab('info')}
      className={`flex-1 py-3 text-sm font-medium transition-colors ${
        activeTab === 'info'
          ? 'text-[#033d60] border-b-2 border-[#033d60]'
          : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      Informações
    </button>
    <button
      onClick={() => setActiveTab('photos')}
      className={`flex-1 py-3 text-sm font-medium transition-colors ${
        activeTab === 'photos'
          ? 'text-[#033d60] border-b-2 border-[#033d60]'
          : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      Fotos
    </button>
  </div>
</div>

{/* Conteúdo das abas */}
<div className="p-6">
  {activeTab === 'info' && (
    // Conteúdo existente (data, horário, local, etc)
  )}

  {activeTab === 'photos' && (
    <div className="space-y-6">
      <PhotoUpload 
        eventId={event.id} 
        onSuccess={() => setPhotoRefreshKey(prev => prev + 1)}
      />
      <PhotoGallery 
        eventId={event.id}
        refreshTrigger={photoRefreshKey}
      />
    </div>
  )}
</div>
```

---

## 🧪 Testes

### Checklist de Testes

- [ ] **Upload Básico**
  - [ ] Upload 1 foto (< 5MB)
  - [ ] Verificar progresso
  - [ ] Confirmar aparecimento na galeria
  - [ ] Verificar thumbnail gerado

- [ ] **Validações**
  - [ ] Rejeitar arquivo > 5MB
  - [ ] Rejeitar formato não-imagem
  - [ ] Bloquear 6ª foto do mesmo usuário

- [ ] **Múltiplos Uploads**
  - [ ] Upload 3 fotos simultâneas
  - [ ] Verificar todas aparecem
  - [ ] Verificar ordem (mais recente primeiro)

- [ ] **Galeria**
  - [ ] Abrir lightbox
  - [ ] Navegar prev/next
  - [ ] Fechar lightbox
  - [ ] Galeria vazia mostra placeholder

- [ ] **Performance**
  - [ ] Tempo upload < 5s (foto 2MB)
  - [ ] Galeria com 50 fotos carrega < 3s
  - [ ] Thumbnails carregam primeiro

- [ ] **Responsivo**
  - [ ] Mobile (2 colunas)
  - [ ] Tablet (3 colunas)
  - [ ] Desktop (4 colunas)

- [ ] **Offline**
  - [ ] Desconectar WiFi
  - [ ] Tentar upload (deve mostrar erro)
  - [ ] Reconectar e tentar novamente

---

## 💰 Custos Firebase

### Plano Gratuito (Spark)
- **Storage**: 5GB
- **Downloads**: 1GB/dia
- **Firestore Reads**: 50k/dia
- **Firestore Writes**: 20k/dia

### Projeção Mensal
**Cenário**: 100 eventos, 20 fotos/evento em média

- **Storage**: ~500MB (2000 fotos × 250KB)
- **Uploads**: ~2GB/mês
- **Downloads**: ~10GB/mês (500 visualizações)
- **Firestore Reads**: ~15k/mês

**Conclusão**: Dentro do plano gratuito! ✅

### Quando Precisar Escalar (Blaze)
- Storage: R$ 0,026/GB
- Downloads: R$ 0,12/GB
- Firestore: R$ 0,06/100k leituras

---

## 🚀 Roadmap Futuro

### v2.0 - Moderação (+ 2 dias)
- [ ] Admin panel
- [ ] Aprovar/rejeitar fotos
- [ ] Sistema de denúncias
- [ ] Filtro automático (Cloud Vision AI)

### v3.0 - Social (+ 3 dias)
- [ ] Curtidas/reações
- [ ] Comentários
- [ ] Marcar pessoas
- [ ] Compartilhar direto

### v4.0 - Avançado (+ 2 dias)
- [ ] Álbuns por mês/local
- [ ] Download ZIP
- [ ] Slideshow
- [ ] Push notifications

---

## 📚 Referências

- [Firebase Storage](https://firebase.google.com/docs/storage)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [React Dropzone](https://react-dropzone.js.org/)
- [Browser Image Compression](https://github.com/Donaldcwl/browser-image-compression)

---

## ✅ Checklist Final

### Setup
- [ ] Criar projeto Firebase
- [ ] Ativar Authentication (Anônimo)
- [ ] Ativar Storage
- [ ] Ativar Firestore
- [ ] Configurar Security Rules
- [ ] Adicionar variáveis ambiente

### Desenvolvimento
- [ ] Instalar dependências
- [ ] Criar tipos TypeScript
- [ ] Implementar serviços Firebase
- [ ] Criar PhotoUpload
- [ ] Criar PhotoGallery
- [ ] Integrar com EventCard

### Testes
- [ ] Testar upload
- [ ] Testar validações
- [ ] Testar galeria
- [ ] Testar lightbox
- [ ] Testar responsivo

### Deploy
- [ ] Configurar prod
- [ ] Atualizar rules
- [ ] Testar em produção
- [ ] Documentar para usuários

---

**Status**: Aguardando Implementação  
**Última atualização**: 30/01/2025
