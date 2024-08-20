# Fiscalis

Fiscalis é um aplicativo de gestão financeira pessoal, desenvolvido para ajudar você a controlar suas finanças de forma simples e eficiente. Com uma interface intuitiva e funcionalidades poderosas, o Fiscalis permite que você acompanhe suas despesas, crie orçamentos e visualize análises financeiras detalhadas.

## Funcionalidades

- **Gerenciamento de Despesas:** Adicione e categorize suas despesas para um controle preciso.
- **Criação de Orçamentos:** Estabeleça metas financeiras e acompanhe o progresso em tempo real.
- **Visualização de Dados:** Gráficos interativos usando Chart.js e D3.js para análise financeira.
- **Relatórios Exportáveis:** Exporte suas finanças em formatos PDF e Excel.
- **Autenticação Segura:** Proteja seus dados com autenticação usando Laravel Sanctum.

## Tecnologias Utilizadas

- **Backend:** Laravel
- **Frontend:** React com Chart.js e D3.js
- **Autenticação:** Laravel Sanctum
- **Banco de Dados:** MySQL 
- **Estilização:** Tailwind CSS

## Requisitos

- PHP 8.0+
- Composer
- Node.js & NPM
- MySQL 

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/jeanikt/fiscalis.git
   cd fiscalis
   
2. Instale as dependências do PHP e do Node.js:
   ```bash
   composer install
   npm install
   
3. Configure o arquivo .env com suas credenciais de banco de dados e outras configurações necessárias:
   ```bash
   cp .env.example .env
   php artisan key:generate

4. Execute as migrações e seeds para configurar o banco de dados:
   ```bash
   php artisan migrate --seed

5. Inicie o servidor de desenvolvimento:
   ```bash
   php artisan serve
   npm run dev

6. Acesse o aplicativo em http://localhost:8000.
   
Como Contribuir
Faça um fork do repositório.
Crie uma nova branch para sua feature (git checkout -b feature/nome-da-feature).
Faça commits das suas alterações (git commit -m 'Adicionar nova feature').
Envie para a branch original (git push origin feature/nome-da-feature).
Abra um Pull Request.

Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para mais detalhes.

Contato
Para mais informações ou sugestões, entre em contato através de jeandev003@gmail.com

Esse README fornece uma visão geral clara do projeto, com instruções detalhadas de instalação e contribuição, além de destacar as principais funcionalidades e tecnologias utilizadas.
