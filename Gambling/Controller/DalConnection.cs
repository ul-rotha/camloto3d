namespace GameAPI.App_Code
{
    public class DalConnection
    {

        public static string DBUser = "sqlserver";

        public static string DBPassword = "Gamevb$92";

        public static string DBDatabase  = "CamLotto3_Copy";

        public static string EDBConnectionString = "Server=tcp:servergame.database.windows.net,1433;Initial Catalog=" + DBDatabase + ";Persist Security Info=False;User ID=" + DBUser + ";Password=" + DBPassword + ";MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        
    }
}
