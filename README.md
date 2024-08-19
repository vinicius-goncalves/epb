# EPB

Ferramentas e melhorias para sistemas do Google.

## Tópicos

-   [Introdução](#introduction)
-   [Como instalar?](#how-to-install)
-   [Como configurar?](#settings)
-   [Tabela de recursos](#features)
-   [Funcionalidades explicadas](#features-description)

<div id="introduction">
  <h2>Introdução à EPB</h2>
  <p>Seja muito bem vind@ ao guia da extensão <strong>EPB</strong>. A EPB é uma extensão criada com o foco de adicionar mais recursos e auxiliando na produtividade no sistema de gerenciamento de fóruns do Google. Neste guia, iremos cobrir as funcionalidades <strong>disponíves</strong> na extensão. </p>
  <small>Alguns dos recursos não estão disponíveis no momento, pois estão sendo desenvolvidos.</small>
</div>

<div id="how-to-install">
  <h2>Como instalar a extensão?</h2>
  <p>A instalação da extensão é muito simples, basta acessar a página da extensão na loja de extensões do Google Chrome e clicar em "Instalar", após isso, ela será instalada e você poderá fixar junto com suas outras extensões sem maiores problemas.</p>
</div>

<div id="settings">
  <h2>Como configurar a extensão?</h2>
  <p>Por padrão, quase todos os recursos são desativados, e para configurar com os recursos desejados, basta clicar no ícone da extensão que você será levado a página de configuração dela. Uma alternativa para abrir as configurações, é clicar com o botão de direito em cima do ícone da extensão e acessar "<strong>Opções</strong>".</p>
</div>

<div id="features">
  <h2>Tabela de recursos</h2>
  <p>A extensão vem acompanha de várias funcionalidades que serão mostradas neste guia, no geral, os recursos são dividas em:</p>
  <table>
    <thead>
      <th>Funcionalidades</th>
      <th>Correções</th>
      <th>Melhorias</th>
      <th>Ferramentas</th>
      <th>For developers</th>
    </thead>
    <tbody>
      <td>Adicionam recursos extras como escolher um fórum padrão para escalação aos times do Google.</td>
      <td>Corrigem problemas visíseis que podem atrapalhar na sua produtividade.</td>
      <td>Implementam recursos visuais como mais detalhes ao acessar um perfil na comunidade.</td>
      <td>Adicionam ferramentas para fazer exportações de seus dados, como filtros ou respostas automáticas.</td>
      <td>Seção dedicada a desenvolvedores, mais detalhes são enviados ao console (do DevTools) do que está acontecendo na extensão.</td>
    </tbody>
  </table>
</div>

<div id="features-description">
  <h2>Funcionalidades explicadas</h2>
  <p>As funcionalidades serão explicadas com os detalhes práticos, e na mesma ordem apresentada nas configurações da extensão, portanto, confira:</p>
  <div>
    <div>
      <h4>Funcionalidades</h4>
      <ol>
          <li>
              <p><strong>Forum padrão</strong>: Por padrão, ao escalar uma pergunta para fóruns privados, você precisa selecionar um fórum a cada vez que uma solicitação é encaminhada, e não existe uma configuração no sistema para selecionar um fórum padrão, com a EPB, você poderá configurar um fórum padrão para as escalações e assim ela irá fazer esse processo para você.</p>
          </li>
          <li>
              <p><strong>Detector threads</strong>: Essa opção, no momento, é utilizada apenas para o recurso de "Fórum padrão", mas ela irá ser útil futuramente para demais recursos. Com ela ativada, será detectado automaticamente se você está em uma thread quando a página recarregar pela primeira vez ou se você recarregar a página, caso contrário, se essa opção estiver desativada será necessário que você faça qualquer alteração na página, como voltar para o menu principal, ir para uma outra thread, etc. para que o recurso de "Fórum padrão" funcione automaticamente.</p>
          </li>
      </ol>
    </div>
    <div>
      <h4>Correções</h4>
      <ol>
          <li>
              <p><strong>Limitar o height de questões com PII</strong>: Quando é inserido questões PII em uma solicitação, o sistema irá detectar quais dados são estes e pedir para você analisar antes de postar - entretanto, quanto mais dados ela identificar, maior a lista ficará longa, fazendo assim sumir o botão de postar a mensagem e precisando diminiuir o zoom do navegador para isso. Ao ativar essa função, o height será limitado para 150px, e caso passar deste valor, a barra de rolagem irá aparecer automáticamente. </p>
          </li>
      </ol>
    </div>
<div>
      <h4>Melhorias</h4>
      <ol>
          <li>
              <p><strong>Aprimorar visualização de perfil</strong>: Ativando essa opção, a página de perfis tanto na comunidade pública quanto na comunidade privada, será aprimado com recursos como a melhoria da seção de "Vídeos mais assistidos" mostrando mais detalhes daquele vídeo, como os vídeos são vídeos que vem do próprio YouTube, dados como visualizações, ID do vídeo, etc. serão carregados sem precisar acessar o post específicamente ou o próprio vídeo no YouTube.</p>
          </li>
		  <li>
              <p><strong>Melhorar visualização de nome de usuários em threads</strong>: As vezes, dependendo da resolução do monitor, ou do navegador, devido a responsividade, o navegador irá se adequar aquela resolução, e muita das vezes, o nome do usuário, junto com o selo, e se ele for o autor original ou não da postagem, irá acabar havendo uma quebra nas linhas. Ativando essa opção, essas quebras serão corrigidas e se o usuário que postou foi o autor original da postagem, ao invés de "Autor original que fez a postagem" (ou semelhante) será se referido como "OP". É esperado que essa funcionalidade seja movida futuramente para a seção de "Correções" ao invés de "Melhorias".</p>
          </li>
      </ol>
    </div>
	<div>
      <h4>Ferramentas</h4>
      <p>As funcionalidades desta seção são auto explicativas. Enquanto a ferramenta de "Exporar filtros" exporta os filtros de sua conta, a ferramenta de "Exportar respostas automáticas" irá exportar as respostas automáticas de sua conta. Essa segunda ferramenta pode haver uma pequena queda de desempenho em questões de milisegundos ou quase nula, algo impercetível, quando o processo se inicia.</p>
    </div>
  </div>
</div>
