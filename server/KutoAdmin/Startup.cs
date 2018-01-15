using Microsoft.Owin;
using Owin;

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
}
