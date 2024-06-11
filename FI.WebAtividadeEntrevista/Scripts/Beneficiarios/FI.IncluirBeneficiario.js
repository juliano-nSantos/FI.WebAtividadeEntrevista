function adicionarLinha() {

    var id = document.getElementById("IdBeneficiario").value;

    if (id != "") {    
        $.each($("#modal-benef").find("#gridBeneficiarios > tbody > tr"), function (index, value) {
            var linhaTabela = $(this);
            
            if (id == linhaTabela.find("#Id").val()) {              
                linhaTabela.find(".nome").text(document.getElementById("NomeBeneficiario").value)
                document.getElementById("IdBeneficiario").value = "";
            }
        });

        document.getElementById("btnIncluir").textContent = "Incluir";
    }
    else {
        var linha = "<tr>";
        linha += '<td class="cpf">' + document.getElementById("CPFBeneficiario").value + '</td>';
        linha += '<td class="nome">' + document.getElementById("NomeBeneficiario").value + '</td>';
        linha += '<td><button class="btn btn-sm btn-primary"> Atualizar</button> ';
        linha += '<button class="btn btn-sm btn-primary" onclick="remove(this)">Excluir</button></td>';
        linha += '</tr>';

        $("#gridBeneficiarios tbody").prepend(linha);
    }   

    document.getElementById("CPFBeneficiario").value = '';
    document.getElementById("NomeBeneficiario").value = '';
}


function remove(button) {
    var row = button.parentNode.parentNode;
   
    row.parentNode.removeChild(row);
}

function excluirBeneficiario(id) {
    $.ajax({
        url: urlExcluirBenef,
        type: 'POST',
        data: { idBeneficiario: id },
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
                //$("#formCadastro")[0].reset();
                window.location.href = urlRetorno;
            }
    });
}