$(document).ready(function () {
    if (obj) {        
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(formatarValor("#####-###", obj.CEP));
        $('#formCadastro #CPF').val(formatarValor("###.###.###-##", obj.CPF));
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(formatarValor("(##) ####-####", obj.Telefone));

        obj.Beneficiarios.forEach((item) =>
            card(item)
        );        
    }

    function card(beneficiario) {
        const content = `
        <input type="hidden" id="Id" value="${beneficiario.Id}"/>
        <td class="cpf">${formatarValor("###.###.###-##",beneficiario.CPF)}</td>
        <td class="nome">${beneficiario.Nome}</td>
        <td>
            <button type="button" class="btn btn-sm btn-primary"
                onclick="editarBeneficiario(event, {id: ${beneficiario.Id}, cpf: '${formatarValor("###.###.###-##",
                    beneficiario.CPF)}', nome: '${beneficiario.Nome}'})"> Atualizar</button>
            <button class="btn btn-sm btn-primary"
                onclick="excluirBeneficiario(${beneficiario.Id})">Excluir</button>
        </td>
        `
        const card = document.createElement("tr")
        card.innerHTML = content;

        document.querySelector("#listBeneficiarios")
            .appendChild(card);
    }

    function encapsulaTabelaBeneficiario() {
        var listTabela = [];        

        $.each($("#modal-benef").find("#gridBeneficiarios > tbody > tr"), function (index, value) {
            var linhaTabela = $(this);
            var itemTabela = {
                CPF: linhaTabela.find(".cpf").text().replace(/\D+/g, ''),
                NOME: linhaTabela.find(".nome").text(),
                Id: linhaTabela.find("#Id").val()
            };
            listTabela.push(itemTabela);
        });

        return listTabela;
    }    

    $('#formCadastro').submit(function (e) {
        e.preventDefault();        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val().replace(/\D+/g, ''),
                "CPF": $(this).find("#CPF").val().replace(/\D+/g, ''),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val().replace(/\D+/g, ''),
                "Beneficiarios": encapsulaTabelaBeneficiario()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function editarBeneficiario(event, obj) {

    document.getElementById("CPFBeneficiario").value = obj.cpf;

    document.getElementById("NomeBeneficiario").value = obj.nome;
    document.getElementById("IdBeneficiario").value = obj.id;
    document.getElementById("btnIncluir").textContent = "Salvar";    
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
