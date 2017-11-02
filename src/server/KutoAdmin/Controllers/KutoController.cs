using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KutoAdmin.Controllers
{
    public class KutoController : Controller
    {
        // GET: Kuto
        public ActionResult Index()
        {
            return View();
        }
    }
}