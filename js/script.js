function exibeNota(data){
            if($.isArray(data)){
                $('#retorno').empty();

                //value: valor
                //prepend(): semelhando ao .html() (que substitui), mas o prepend mostra no início do conteúdo, não substituindo o elemento
                $.each(data, function(index,value){
                    $('#retorno').prepend("ID: " + value.Id + "<br>Titulo: " + value.Title + "<br>Conteúdo: " + value.Body + "<br><br>");
                });
            }
            else{
                $('#retorno').html("ID: " + data.Id + "<br>Título: " + data.Title + "<br>Conteudo: " + data.Body + "<br><br>");
            }

              //limpando o loading
             $("#loading").empty();
        }

        function exibeErroNota(){
            $('#retorno').html("Ops, algo de errado aconteceu!");

            //limpando o loading
             $("#loading").empty();
        }

        function aguardaNota(){
            $('#loading').html("<img style='width: 15px; margin-left: 10px;' src='http://www.devmedia.com.br/cursos/img/loading.gif' alt='loading'>");
        }

        function cliqueBotao(event){
            event.preventDefault();
            
            //resgatando o valor do input
            var id = $('#id_nota').val();

            console.log('entrou');

            jQuery.ajax({
                type: "GET",
                dataType: "json",
                url: "http://devmedianotesapi.azurewebsites.net/api/notes/"+id,
                success: exibeNota, //se for erro naõ faz nada
                error: exibeErroNota,
                beforeSend: aguardaNota //status ENQUANTO a aplicação está enviando a aquisição - aqui vai entrar um gif animado de loading
            });

        }

        $(document).ready(function(){
            $('#enviar').on('click',cliqueBotao);
        });