using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(ClienteModel model)
        {
            BoCliente bo = new BoCliente();
            
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.VerificarExistencia(model.CPF))
                {
                    Response.StatusCode = 400;
                    return Json("CPF já esta cadastrado!");
                }

                model.Id = bo.Incluir(MapParaEntidade(model));

           
                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Alterar(ClienteModel model)
        {
            BoCliente bo = new BoCliente();
       
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.VerificarExistencia(model.CPF, model.Id))
                {
                    Response.StatusCode = 400;
                    return Json("CPF já esta cadastrado!");
                }

                bo.Alterar(MapParaEntidade(model));
                               
                return Json("Cadastro alterado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoCliente bo = new BoCliente();
            Cliente cliente = bo.Consultar(id);
            Models.ClienteModel model = null;

            if (cliente != null)
            {
                model = MapParaModel(cliente);           
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult ExcluirBeneficiario(long idBeneficiario)
        {   
            if(idBeneficiario <= 0)
            {
                Response.StatusCode = 400;
                return Json("informe um id de beneficiario para excluir");
            }

            BoBeneficiario bo = new BoBeneficiario();

            bo.Excluir(idBeneficiario);

            return Json("Beneficiario excluido com sucesso");
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        private ClienteModel MapParaModel(Cliente cliente)
        {
            var model = new ClienteModel()
            {
                Id = cliente.Id,
                CEP = cliente.CEP,
                Cidade = cliente.Cidade,
                Email = cliente.Email,
                Estado = cliente.Estado,
                Logradouro = cliente.Logradouro,
                Nacionalidade = cliente.Nacionalidade,
                Nome = cliente.Nome,
                Sobrenome = cliente.Sobrenome,
                Telefone = cliente.Telefone,
                CPF = cliente.CPF
            };

            if (cliente.Beneficiarios == null)
                return model;

            foreach (var ben in cliente.Beneficiarios)
            {
                model.Beneficiarios.Add(new BeneficiarioModel()
                {
                    Id = ben.Id,
                    CPF = ben.CPF,
                    Nome = ben.Nome,
                    IdCliente = ben.IdCliente
                });
            }

            return model;
        }

        private Cliente MapParaEntidade(ClienteModel model)
        {
            var cliente = new Cliente()
            {
                Id = model.Id,
                CEP = model.CEP,
                Cidade = model.Cidade,
                Email = model.Email,
                Estado = model.Estado,
                Logradouro = model.Logradouro,
                Nacionalidade = model.Nacionalidade,
                Nome = model.Nome,
                Sobrenome = model.Sobrenome,
                Telefone = model.Telefone,
                CPF = model.CPF
            };

            if (model.Beneficiarios == null)
                return cliente;

            foreach (var bene in model.Beneficiarios)
            {
                cliente.Beneficiarios.Add(new Beneficiario()
                {
                    Id = bene.Id,
                    CPF = bene.CPF,
                    Nome = bene.Nome,
                    IdCliente = bene.IdCliente
                });
            }

            return cliente;
        }
    }
}