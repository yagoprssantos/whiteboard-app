# Ferramentas de Desenho

## Visão Geral

Este documento detalha as especificações técnicas e diretrizes de implementação para as ferramentas de desenho do nosso aplicativo de quadro branco. O objetivo é fornecer uma experiência de desenho intuitiva, versátil e responsiva, inspirada nas melhores práticas das ferramentas analisadas, especialmente o Excalidraw e o FigJam.

## Ferramentas Básicas de Desenho

### 1. Formas Geométricas

- **Retângulo**: Implementar com opções de:

  - Cantos arredondados (raio ajustável)
  - Proporções fixas (quadrado perfeito com tecla Shift)
  - Desenho a partir do centro (com tecla Alt)

- **Círculo/Elipse**: Implementar com:

  - Controle de proporção (círculo perfeito com tecla Shift)
  - Desenho a partir do centro (com tecla Alt)

- **Triângulo**: Implementar com:

  - Opções para triângulo equilátero, isósceles e escaleno
  - Rotação livre durante a criação

- **Losango/Polígono**: Incluir polígonos regulares de 3-10 lados
  - Interface para ajuste do número de lados
  - Controle de proporções e rotação

### 2. Ferramentas de Linha

- **Linha Reta**: Implementar com:

  - Restrição a ângulos de 15° (com tecla Shift)
  - Controle de espessura e estilo
  - Opção para adicionar pontos de inflexão (multi-segmento)

- **Linha Curva**: Implementar usando:

  - Curvas de Bézier com manipulação de pontos de controle
  - Ajuste de suavidade

- **Seta**: Implementar com:

  - Estilos diferentes de pontas de seta (aberta, fechada, preenchida)
  - Opção para seta bidirecional
  - Restrição a ângulos de 15° (com tecla Shift)

- **Conector**: Implementar com:
  - Conexão automática entre objetos
  - Roteamento inteligente para evitar sobreposição
  - Permanência da conexão durante movimentação dos objetos

### 3. Desenho à Mão Livre

- **Lápis/Pincel**: Implementar com:

  - Sensibilidade à pressão (para dispositivos compatíveis)
  - Suavização de traço ajustável
  - Modos simples e avançado

- **Marcador/Realce**: Implementar com:

  - Semi-transparência para sobreposição
  - Opção para destacar áreas específicas

- **Caneta Estilizada**: Implementar com estilo de "desenho à mão" similar ao Excalidraw
  - Algoritmo para adicionar "imperfeições" naturais
  - Controle do nível de "desorganização" do traço

### 4. Borracha e Edição

- **Borracha**: Implementar com:

  - Modo de precisão para apagar partes específicas de um traço
  - Modo de seleção para apagar objetos inteiros
  - Tamanho ajustável

- **Edição de Pontos**: Permitir:
  - Manipulação de pontos de controle após criação
  - Adição/remoção de pontos em linhas existentes
  - Conversão entre tipos de pontos (suave/angular)

## Personalização de Aparência

### 1. Estilos de Traço

- **Espessura**: Implementar com:

  - Predefinições (fino, médio, grosso)
  - Valor personalizado (0.5px - 20px)

- **Estilo de Linha**: Implementar variações como:

  - Sólida
  - Tracejada (com padrões variáveis)
  - Pontilhada
  - Combinações personalizáveis

- **Extremidades**: Implementar opções como:
  - Arredondada
  - Quadrada
  - Afilada

### 2. Cores e Preenchimentos

- **Seletor de Cores**: Implementar com:

  - Paleta padrão com cores acessíveis
  - Seletor avançado com RGB/HSL/HEX
  - Histórico de cores recentemente utilizadas
  - Salvar cores favoritas

- **Preenchimentos**: Implementar opções para:

  - Cor sólida
  - Degradês (linear, radial)
  - Padrões e texturas
  - Transparência ajustável (0-100%)

- **Estilos de Preenchimento**: Incluir:
  - Hachuras em diferentes padrões
  - Preenchimento parcial
  - Efeito aquarela/dispersão

### 3. Efeitos e Acabamentos

- **Sombras**: Implementar com controles para:

  - Deslocamento (X/Y)
  - Desfoque
  - Cor e opacidade

- **Bordas**: Implementar com:
  - Espessura interna/externa
  - Estilo (sólido, tracejado)
  - Cantos (arredondado, chanfrado)

## Texto e Anotações

### 1. Ferramenta de Texto

- **Editor de Texto**: Implementar com:

  - Formatação básica (negrito, itálico, sublinhado)
  - Alinhamento (esquerda, centro, direita, justificado)
  - Listas (com marcadores e numeradas)
  - Fontes variadas (incluindo opções de "desenho à mão")

- **Caixas de Texto**: Implementar com:
  - Redimensionamento automático ou manual
  - Vinculação a objetos (anotações)
  - Rotação

### 2. Anotações Específicas

- **Notas Adesivas**: Implementar com:

  - Cores personalizáveis
  - Redimensionamento
  - Empilhamento visual

- **Callouts/Balões**: Implementar com:
  - Estilos diversos (pensamento, fala, informação)
  - Personalização da "cauda" apontando para elementos

## Biblioteca de Componentes

### 1. Sistema de Bibliotecas

- **Biblioteca Padrão**: Incluir componentes para:

  - Diagramas de fluxo
  - Wireframes de UI
  - Mapas mentais
  - Organogramas
  - Diagramas UML básicos
  - Ícones comuns

- **Bibliotecas Personalizadas**: Implementar funcionalidade para:
  - Salvar elementos como componentes reutilizáveis
  - Organizar em categorias
  - Importar/exportar bibliotecas

### 2. Componentes Inteligentes

- **Comportamentos Especiais**: Implementar componentes com:

  - Pontos de conexão predefinidos
  - Propriedades editáveis (texto, cor, valores)
  - Redimensionamento inteligente preservando proporções

- **Templates Interativos**: Desenvolver modelos para:
  - Gráficos simples (barras, linhas, pizza)
  - Quadros Kanban
  - Linhas do tempo
  - Matrizes de decisão

## Recursos Avançados

### 1. Assistência ao Desenho

- **Alinhamento Inteligente**: Implementar:

  - Guias dinâmicas durante movimentação/redimensionamento
  - Snap a grade/guias/objetos
  - Distribuição uniforme de objetos

- **Reconhecimento de Formas**: Implementar detecção e correção de:
  - Formas básicas desenhadas à mão
  - Linhas retas e ângulos
  - Simetria aproximada

### 2. Recursos de IA

- **Geração de Formas**: Implementar:

  - Conversão de texto para diagrama (similar ao Mermaid)
  - Sugestão de layouts para diagramas complexos
  - Otimização da organização de elementos

- **Estilização Automática**: Implementar:
  - Sugestão de esquemas de cores harmonizados
  - Ajuste automático de espaçamento e proporções
  - Aplicação de estilos consistentes

### 3. Acessibilidade

- **Suporte a Tecnologias Assistivas**:

  - Compatibilidade com leitores de tela
  - Navegação completa por teclado
  - Atalhos personalizáveis

- **Design Inclusivo**:
  - Paletas de cores acessíveis
  - Teste de contraste para texto
  - Feedback visual e auditivo (opcional)

## Referências e Inspirações

- Estilo de desenho à mão do Excalidraw
- Ferramentas de formas e conectores do FigJam
- Sistema de biblioteca de componentes do Whimsical
- Recursos de anotação do Milanote
- Interface minimalista mas completa do Figma
