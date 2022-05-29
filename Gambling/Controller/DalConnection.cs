namespace GameAPI.App_Code
{
    public class DalConnection
    {

        public static string DBUser = "sqlserver";

        public static string DBPassword = "Game$168168";

        public static string DBDatabase  = "CamLotto3";

        public static string EDBConnectionString = "Server=tcp:camloto3d.database.windows.net,1433;Initial Catalog=" + DBDatabase + ";Persist Security Info=False;User ID=" + DBUser + ";Password=" + DBPassword + ";MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        
    }
}
