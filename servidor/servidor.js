const
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path');


var server = http.createServer(function(request, response) {

	/* Observações:

	 * - separar as variáveis para melhorar a leitura, ao invés de declarar como "var minhavar1='x', minhavar2='y'" assim  se permite que se faça comentários de código individuais
	 * - em testes, declarar caminhos "relativos" com ./ ou ../ ao invés de utilizar caminhos completos. isto permite que se mova ou renomeie a pasta conforme necessidade para qualquer lugar do windows ou linux e ainda assim o projeto continua funcionando, pois você não especificou o caminho ABSOLUTO dos arquivos
	 * - a função url.parse().pathname serve para ter CERTEZA que iremos descartar a parte do texto da requisição "http://localhost.meuservidorweb.blah" e extrair SOMENTE a parte final da requisição que é o "/index.html" ou "/bootstrap/blah" e assim por diante
	 * - as diversas pastas e arquivos html/js/css/imagems foram colocados dentro de uma pasta única. isto permite que se declare somente a pasta inicial, no caso (../html), e todos os arquivos sejam recuperados DENTRO (a partir) dessa
	 * - a função join() server para concatenar/emendar variáveis de texto. percebi que ela não estava montando corretamente o [caminho + nome do arquivo] exato, pois estava utilizando [process.cwd() + "caminho completo da pasta" + arquivo solicitado pelo browser/usuário
	 		portanto, estava errado, pois estava-se montando uma "string" com o seguinte conteúdo:
	 		"'/C:\Users\AngelicaHelena\Documents\WebProjekt\Issue Tracker\../C:\Users\AngelicaHelena\Documents\WebProjekt\Issue Tracker\html\index.html'" (ou algo parecido)
	 		o correto seria:
	 			ignorar o cwd(), que neste caso é o "[C]urrent [W]orking [D]irectory": você pode trabalhar com caminhos RELATIVOS
	 			*** CONSULTAR TEORIA: Explicação longa: http://www.nce.ufrj.br/ginape/cursohtml/conteudo/ligacoes/absrel.htm
	 *
	 */




	//Check (and extract) only pathname. Eg.: "/index.html" extracted from "http://localhost/index.html" sent to nodejs by browser
    var uri = url.parse(request.url).pathname;

    //The http (nodejs) server never knows WHERE is the file to serve. So you have to help him, informing the correct path+filename. In this case, using RELATIVE paths.
    //**** Check: http://dorkage.net/files/uploads/url.gif
	var filename = path.join("../html", uri);

	//If file exists, return it to browser. If file does NOT exist (or any other exception), return an error.
    fs.readFile(filename, 'binary', function(err, file) {
        if(!err){
        	//File exists: return file to user, and do not write any log
            response.writeHead(200);
            response.write(file, 'binary');
            response.end();
			console.log(filename+": OK");
        }else{
        	if(err.code==="ENOENT"){
        		//File or path not found
	            response.writeHead(404);
	            response.end("File not found " + uri);
	            console.log(filename+": ERROR: File not found");
	        }else{
	        	response.writeHead(500);
	            response.end("Error: "+err.code);
	            console.log(filename+": ERROR: other");
	        }
        }
    });
});


  server.listen(88, function(o){
	var instance = this;
	console.log("NodeJS Server: listening for Http Requests at ["+instance._connectionKey+"]");
	console.log("-----------------------------------------------------------------");
	
});
