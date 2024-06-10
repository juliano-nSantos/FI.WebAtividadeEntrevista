using FI.AtividadeEntrevista.DAL.Beneficiarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public void Excluir(long id)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            
            ben.Excluir(id);
        }
    }
}
