using System.Collections.Generic;
using System.Data;

namespace FI.AtividadeEntrevista.DAL.Beneficiarios
{
    internal class DaoBeneficiario : AcessoDados
    {
        internal bool Incluir(DML.Beneficiario model)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", model.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", model.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IdCliente", model.IdCliente));

            DataSet ds = base.Consultar("FI_SP_IncluirBeneficiario", parametros);
            long ret = 0;

            if(ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);

            return ret > 0;
        }
    }
}
