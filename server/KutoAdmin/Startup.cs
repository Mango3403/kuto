using Microsoft.Owin;
using Owin;
using System.Web;
using System.Web.Mvc;

[assembly: OwinStartupAttribute(typeof(KutoAdmin.Startup))]
namespace KutoAdmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }

    //public class SessionExpireFilterAttribute : ActionFilterAttribute
    //{
    //    public override void OnActionExecuting(ActionExecutingContext filterContext)
    //    {
    //        HttpContext ctx = HttpContext.Current;

    //        // check if session is supported
    //        CurrentCustomer objCurrentCustomer = new CurrentCustomer();
    //        objCurrentCustomer = ((CurrentCustomer)SessionStore.GetSessionValue(SessionStore.Customer));
    //        if (objCurrentCustomer == null)
    //        {
    //            // check if a new session id was generated
    //            filterContext.Result = new RedirectResult("~/Users/Login");
    //            return;
    //        }

    //        base.OnActionExecuting(filterContext);
    //    }
    //}
}
