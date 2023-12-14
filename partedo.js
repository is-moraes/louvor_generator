<body>
    <div id="formulario">
        <label for="nome">Nome da Música (.doc):</label>
        <input type="text" id="nome" placeholder="Nome da Música">

        <label for="linkYoutube">Link no YouTube/Versão:</label>
        <input type="text" id="linkYoutube" placeholder="Link do YouTube/Versão">

        <label for="linkCifrasClub">Link do Cifras Club:</label>
        <input type="text" id="linkCifrasClub" placeholder="Link do Cifras Club">

        <img id="preview" src="" alt="Preview do Vídeo">

        <label for="voz">Voz Principal:</label>
        <select id="voz">
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
        </select>

        <label for="data">Selecione a Data:</label>
        <input type="date" id="data">

        <label for="arquivoMP3">Track:</label>
        <input type="file" id="arquivoMP3" accept=".mp3">

        <label for="tonalidade">Selecione a Tonalidade:</label>
        <select id="tonalidade">
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="D">D</option>
            <option value="D#">D#</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="F#">F#</option>
            <option value="G">G</option>
            <option value="G#">G#</option>
            <option value="A">A</option>
            <option value="A#">A#</option>
            <option value="B">G</option>
        </select>

        <button onclick="processarFormulario()">Enviar</button>
    </div>

    <div id="playlist">
        <h2>Playlist</h2>
        <ul id="playlistItens"></ul>
        <button onclick="voltarParaCadastro()">Voltar para o Cadastro</button>
    </div>

    <div id="novocadastro">
        <button id="novocadastro-btn" onclick="novoCadastro()">Novo Cadastro</button>
    </div>

    <div id="videoContainer">
        <iframe id="videoPlayer" frameborder="0" allowfullscreen></iframe>
        <button onclick="fecharVideo()">Fechar Vídeo</button>
    </div>

    <div id="cifraContainer">
        <iframe id="cifra" frameborder="0" allowfullscreen></iframe>
        <button onclick="fecharCifra()">Fechar Cifra</button>
    </div>

    <script>
        document.getElementById('linkYoutube').addEventListener('input', atualizarPrevia);

        function atualizarPrevia() {
            const linkYoutube = document.getElementById('linkYoutube').value;
            const preview = document.getElementById('preview');

            // Extrair o ID do vídeo do link do YouTube
            const videoId = extrairVideoId(linkYoutube);

            // Construir a URL da prévia do vídeo
            const previewUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

            // Atualizar a imagem de prévia
            preview.src = previewUrl;
        }

        function extrairVideoId(linkYoutube) {
            // Extrair o ID do vídeo do link do YouTube
            const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = linkYoutube.match(regex);

            if (match && match[1]) {
                return match[1];
            }

            return null;
        }

        function formatarData(data) {
            const partes = data.split("-");
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }

        function processarFormulario() {
            const nomeMusica = document.getElementById('nome').value;
            const linkYoutube = document.getElementById('linkYoutube').value;
            const linkCifrasClub = document.getElementById('linkCifrasClub').value;
            const vozSelecionada = document.getElementById('voz').value;
            const dataSelecionada = formatarData(document.getElementById('data').value);
            const arquivoMP3 = document.getElementById('arquivoMP3').files[0];
            const tonalidadeSelecionada = document.getElementById('tonalidade').value;

            // Criar um item da playlist
            const playlistItem = `
                <div class="playlistItem">
                    <strong>${nomeMusica}</strong>
                    <br>
					<br> </br>
                    <a href="#" onclick="reproduzirVideo('${linkYoutube}')">Assistir Video</a>
					<br>
                    <br> </br>
					<a href="#" onclick="visualizarCifra('${linkCifrasClub}')">Cifra</a>
                    <br>
					<br> </br>
                    <span>Voz: ${vozSelecionada}</span>
                    <br>
					<br> </br>
                    <span>Data: ${dataSelecionada}</span>
                    <br>
					<br> </br>
                    <span>Tonalidade: ${tonalidadeSelecionada}</span>
                    <br>
					<br> </br>
                    <button onclick="fecharItem()">Fechar</button>
                </div>
            `;

            // Adicionar o item à lista
            const playlistItens = document.getElementById('playlistItens');
            const listItem = document.createElement('li');
            listItem.innerHTML = playlistItem;
            playlistItens.appendChild(listItem);

            // Exibir a div da playlist e o botão de Novo Cadastro
            document.getElementById('formulario').style.display = 'none';
            document.getElementById('playlist').style.display = 'block';
            document.getElementById('novocadastro').style.display = 'block';
        }

        function reproduzirVideo(linkYoutube) {
            const videoContainer = document.getElementById('videoContainer');
            const videoPlayer = document.getElementById('videoPlayer');

            // Extrair o ID do vídeo do link do YouTube
            const videoId = extrairVideoId(linkYoutube);

            // Construir a URL do vídeo incorporado
            const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

            // Definir a origem do iframe para reproduzir o vídeo
            videoPlayer.src = videoUrl;

            // Exibir o contêiner do vídeo
            videoContainer.style.display = 'block';
        }

        function fecharVideo() {
            const videoContainer = document.getElementById('videoContainer');
            const videoPlayer = document.getElementById('videoPlayer');

            // Parar a reprodução do vídeo
            videoPlayer.src = '';

            // Ocultar o contêiner do vídeo
            videoContainer.style.display = 'none';
        }

        function visualizarCifra(linkCifrasClub) {
            const cifraContainer = document.getElementById('cifraContainer');
            const cifra = document.getElementById('cifra');

            // Definir a origem do iframe para visualizar a cifra
            cifra.src = linkCifrasClub;

            // Exibir o contêiner da cifra
            cifraContainer.style.display = 'block';
        }

        function fecharCifra() {
            const cifraContainer = document.getElementById('cifraContainer');
            const cifra = document.getElementById('cifra');

            // Parar a visualização da cifra
            cifra.src = '';

            // Ocultar o contêiner da cifra
            cifraContainer.style.display = 'none';
        }

        function voltarParaCadastro() {
            // Ocultar a div da playlist, o botão de Novo Cadastro e exibir a div do formulário
            document.getElementById('playlist').style.display = 'none';
            document.getElementById('novocadastro').style.display = 'none';
            document.getElementById('formulario').style.display = 'block';
        }

        function novoCadastro() {
            // Limpar os campos e ocultar a div da playlist e o botão de Novo Cadastro
            document.getElementById('formulario').reset();
            document.getElementById('playlist').style.display = 'none';
            document.getElementById('novocadastro').style.display = 'none';
            document.getElementById('formulario').style.display = 'block';
        }
    </script>
</body>
