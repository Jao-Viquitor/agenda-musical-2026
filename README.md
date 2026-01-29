# 🎵 Agenda Musical - Regional Uruguaiana e Fronteira

Sistema web para gerenciamento e visualização de eventos musicais da Congregação Cristã no Brasil - Regional Uruguaiana e Fronteira.

## 📋 Sobre o Projeto

Aplicação desenvolvida para facilitar o acesso e organização dos eventos musicais (ensaios, práticas, reuniões e exames) realizados nas casas de oração da regional. O sistema oferece visualização em calendário, filtros avançados, integração com mapas e calendários externos, além de um sistema de favoritos para os usuários.

## ✨ Funcionalidades

### 📅 Agenda Musical
- **Visualização por mês** - Eventos organizados cronologicamente
- **Filtros avançados** - Por categoria, localização e mês
- **Sistema de favoritos** - Salve eventos importantes (localStorage)
- **Modal de detalhes** - Visualização completa ao clicar no card
- **Eventos passados** - Histórico colapsável de eventos anteriores
- **Categorias de eventos**:
  - Ensaio Local
  - Ensaio Regional
  - Prática em Conjunto
  - Reunião
  - Ensaio Geral
  - Exames

### 🏛️ Casas de Oração
- **Lista completa** - Todas as casas da regional organizadas por cidade
- **Informações detalhadas** - Endereço, horários de cultos e RJM
- **Indicadores visuais** - Destaque para casas principais
- **Navegação rápida** - Link direto para Google Maps

### 🗺️ Mapa Interativo
- **Visualização geográfica** - Todas as cidades da regional
- **Marcadores personalizados** - Diferenciação de casas principais
- **Integração Leaflet** - Mapas interativos e responsivos

### 🔗 Integrações
- **Google Maps** - Rotas e localização
- **Google Calendar** - Adicionar eventos ao calendário pessoal
- **Compartilhamento** - Share nativo do navegador ou fallback para clipboard

## 🏗️ Arquitetura do Projeto

```
agenda-musical/
├── src/
│   ├── components/
│   │   ├── features/          # Componentes de funcionalidades
│   │   │   ├── EventCard.tsx     # Card de evento com modal
│   │   │   ├── Filters.tsx       # Sistema de filtros
│   │   │   ├── ChurchList.tsx    # Lista de casas de oração
│   │   │   └── RegionMap.tsx     # Mapa interativo
│   │   ├── ui/                # Componentes UI reutilizáveis
│   │   │   └── MonthNavigation.tsx
│   │   └── index.ts           # Barrel exports
│   ├── lib/                   # Utilitários e helpers
│   │   ├── dateHelpers.ts        # Funções de data e geração de eventos
│   │   ├── churchData.ts         # Dados das casas de oração
│   │   ├── actionHelpers.ts      # Helpers de ações (share, links)
│   │   └── index.ts
│   ├── types/                 # Tipos TypeScript
│   │   └── index.ts              # Interfaces e Enums
│   ├── App.tsx                # Componente raiz
│   └── main.tsx               # Entry point
├── assets/
│   └── logo.png               # Logo da regional
├── dist/                      # Build de produção
├── index.html                 # HTML template
├── vite.config.ts            # Configuração Vite
├── tsconfig.json             # Configuração TypeScript
├── package.json              # Dependências
└── README.md                 # Documentação
```

## 🚀 Tecnologias

### Core
- **[React](https://react.dev/) 19.2.4** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/) 5.8.2** - Superset JavaScript tipado
- **[Vite](https://vitejs.dev/) 6.2.0** - Build tool e dev server

### UI/UX
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/) 0.563.0** - Biblioteca de ícones
- **[Leaflet](https://leafletjs.com/) 1.9.4** - Mapas interativos

### DevDependencies
- **@vitejs/plugin-react** - Plugin React para Vite
- **@types/node** - Tipos Node.js

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <repository-url>
cd agenda-musical
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute em desenvolvimento
```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 🔨 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção em `/dist` |
| `npm run preview` | Preview da build de produção |

## 📁 Estrutura de Dados

### Eventos (MusicalEvent)
```typescript
interface MusicalEvent {
  id: string;
  title: string;
  location: string;        // Nome da casa de oração
  date?: Date;             // undefined = "A definir"
  time: string;
  category: EventCategory;
  description?: string;
  isSpecial?: boolean;     // Destaque visual
}
```

### Categorias (EventCategory)
```typescript
enum EventCategory {
  ENSAIO_LOCAL = 'Ensaio Local',
  ENSAIO_REGIONAL = 'Ensaio Regional',
  PRATICA_CONJUNTO = 'Prática em Conjunto',
  REUNIAO = 'Reunião',
  ENSAIO_GERAL = 'Ensaio Geral',
  EXAME = 'Exames'
}
```

### Casas de Oração (Church)
```typescript
interface Church {
  name: string;
  address: string;
  services: string;        // Horários de cultos
  rjm?: string;           // Horário RJM
  obs?: string;           // Observações
  isMain?: boolean;       // Casa principal da cidade
  lat?: number;           // Coordenadas
  lng?: number;
}
```

## 🎨 Design System

### Cores Principais
- **Primary**: `#033d60` - Azul institucional
- **Secondary**: `#f1f2f6` - Cinza claro (background)
- **Accent**: `#e11d48` - Rosa (favoritos/destaques)

### Responsividade
- **Mobile First** - Design otimizado para mobile
- **Breakpoints Tailwind**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## 🔐 Armazenamento Local

O sistema utiliza **localStorage** para:
- Favoritos do usuário (`musicalCalendarFavorites`)

## 🌍 Cobertura Regional

### Brasil
- Uruguaiana (5 casas)
- Itaqui (2 casas)
- São Borja
- Alegrete
- Barra do Quaraí
- Quaraí

### Exterior
- **Uruguai**: Artigas, Bella Unión
- **Argentina**: Paso de los Libres

## 📱 Funcionalidades Mobile

- **Responsivo** - Layout adaptativo
- **Touch-friendly** - Botões e cards otimizados para toque
- **Share nativo** - Utiliza API de compartilhamento do dispositivo
- **PWA-ready** - Estrutura preparada para Progressive Web App

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento**: Edite arquivos em `/src`
2. **Hot Reload**: Vite atualiza automaticamente
3. **Build**: `npm run build` gera otimização para produção
4. **Deploy**: Faça upload da pasta `/dist` para servidor

## 📝 Convenções de Código

### Componentes
- PascalCase para nomes
- Props tipadas com interfaces
- Export nomeado preferencial

### Funções
- camelCase para funções utilitárias
- Nomes descritivos e verbos de ação

### Arquivos
- Componentes: `.tsx`
- Utilitários: `.ts`
- Um componente por arquivo (exceto barrel exports)

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Siga as convenções de código
3. Teste localmente com `npm run build`
4. Documente mudanças significativas

## 📄 Licença

© 2025 Setor Musical - Regional Uruguaiana e Fronteira  
CCB - Congregação Cristã no Brasil

---

**Desenvolvido com ❤️ para o Setor Musical**

