## [Posto Médico UEMA](http://www.postomedico.ga)
Aplicação front-end destinada ao posto médico da Universidade Estadual do Maranhão - UEMA que irá consumir dados da API [Posto Médico API](https://github.com/alexilallas/API-RESTful-com-Laravel5.7)


### Tecnologias Utilizadas

* NodeJS v 10.2
* Angular 8.0.2
* Angular CLI 8.0.4

### Instalação

Por se tratar de uma aplicação que utiliza a plataforma do NodeJS, primeiro se deve baixar as bibliotecas utilizadas no projeto através do comando

 `npm install`
 
No projeto foi utilizado o CLI do Angular que facilita no desenvolvimento, possibilitando criar componentes, serviços, módulos e demais elementos da estrutura do Angular pela linha de comando.
Para sua instalação, se utiliza o seguinte comando.

`npm install -g @angular/cli`

Com o Angular CLI também podemos subir a aplicação para o servidor local através do seguinte comando

`ng serve`
> Este comando irá compilar todo o projeto, transformando o código Typescript em JavaScript para que o navegador possa interpreta-lo.

A aplicação poderá ser acessada pela URL padrão
 http://localhost:4200/

### Estrutura do projeto

````
|--- ...
|-- node_modules
|-- src
	|-- app
	|-- assets
	|-- environments
	|--- ...
|-- index.html
|-- style.css
|-- angular.json
|-- package.json
|-- tsconfig.json
|--- ...
````
O pontilhado representa outros diretórios que fazem parte do padrão da framework e não precisamos mexer.
	

 - **node_modules** - Diretório que fica armazenado as bibliotecas baixadas pelo npm. As bibliotecas definidas no `package.json` são baixadas e colocadas nesta pasta.
 - **src** - Contém o código-fonte, arquivos de configurações e arquivos 		estáticos como imagens e ícones.
	 - **app** - Contém as páginas e código-fonte de todo o front-end
	 - **assets** - Contém arquivos estáticos, como imagens, ícones, etc.
	 - **environments** - Contém arquivos com variáveis de ambientes que serão usadas para desenvolvimento.
 - **index.html** - É a página raiz da aplicação, onde cada página será carregada dentro dela.
 - **angular.json** - Arquivo onde fica as configurações do projeto tais como localização de pastas e arquivos como `index.html`, `assets`, `tsconfig.json` e também scripts e styles que serão utilizados no projeto.
 - **package.json** - Arquivo com as dependências do projeto que serão baixadas com o `npm install`.
 - **tsconfig.json** - A presença de um arquivo tsconfig.json em um diretório indica que o diretório é a raiz de um projeto TypeScript. O arquivo tsconfig.json especifica os arquivos raiz e as opções do compilador necessárias para compilar o projeto 

### Configuração

A única configuração necessária no projeto é o URL da API que será consumida pela aplicação.

Como descrito na seção acima, os arquivos que contém as variáveis de ambiente podem ser encontratos em `src/environment`
Haverá dois arquivos:
* environment.ts
* environment.prod.ts

O primeiro será o utilizado para desenvolvimento, enquanto o segundo será utilizado quando a aplicação entrar para produção.
O conteúdo de ambos os arquivos será o export da contante `environment`, o atributo que deverá ser alterado é o `baseAPI`, onde você deverá substituir seu conteúdo pela URL da API.

### Implantação

Embora não se utilize durante o desenvolvimento, para que a aplicação possa subir para o ambiente de teste/produção, será necessário um servidor Apache.

Para gerar a versão da aplicação que irá para o servidor, será utilizado o comando 

`ng build`
> Este comando irá compilar todo  o projeto e gerar uma versão otimizada e ilegível do código-fonte para que seja rodada em um servidor Apache.

A saída desse comando será a criação da pasta **dist** na raiz do projeto.
Você pode mover essa pasta para a raiz do Apache e rodar o projeto normalmente.
