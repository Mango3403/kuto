using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace KutoAdmin
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default",                                              // Route name  FileUpload
                "{controller}/{action}/{id}",                           // URL with parameters
                new { controller = "KutoAdmin", action = "Login", id = "" }  // Parameter defaults
                                                                           //new { controller = "Account", action = "ToolPage", id = "15a9421e-7d00-42fe-b702-4e545bb83f42" }  // Parameter defaults
            );

        }
        protected void Application_Start()
        {
            RegisterRoutes(RouteTable.Routes);
        }
    }
}
