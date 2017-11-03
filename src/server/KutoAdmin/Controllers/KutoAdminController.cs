using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KutoAdmin.Models;
using System.Data.Entity.Core.Objects;
using System.Web.Script.Serialization;
 

namespace KutoAdmin.Controllers
{
    public class KutoAdminController : Controller
    {
        public string ErrorMessage = "";

        public string path = System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "save";

        [HttpPost]
        public string GetDraftByID(int id)
        {
             
            using (KutoEntities db = new KutoEntities())
            {
               return db.spGetDraftByID(id).ToString();
            }
        }

        [HttpPost]
        public string InsertCustomer(string name, string mobile, double LONG, double lat, string address)
        {
            string result = "";
            using (KutoEntities db = new KutoEntities())
            {
                int customerId = db.spInsertCustomer(name, mobile, LONG, lat, address);
                if (customerId > 0)
                {
                    result = "[{\"{result\":\"true\",\"msg\":\"保存成功！\", \"customerId\":" + customerId.ToString() + "}]";
                }
                else
                    result = "[{\"{result\":\"false\",\"msg\":\"保存失败！\"}]";
            }
            return result;
        }

        [HttpPost]
        public string EditImg(HttpPostedFileBase image, string draft)
        {
            string result = "";
            ObjectParameter msg = new ObjectParameter("msg", typeof(string));

            var swfFileSystem = new KTFileSystem();
            if(swfFileSystem.SaveFile(ref image, path, image.FileName))
            {
                using (KutoEntities db = new KutoEntities())
                {
                    if (db.spEditImg(image.FileName, draft, msg) == 0)
                    {
                        result = "[{\"{result\":\"true\",\"msg\":\"保存成功！\"}]";
                         
                    }
                    else
                    {
                        result = "[{\"{result\":\"false\",\"msg\":\"数据库保存失败！\"}]";
                    }
                }
            }
            else
            {
                result = "[{\"{result\":\"false\",\"msg\":\"" + swfFileSystem.strErrorMessage + "\"}]";
            }

            return result;

        }

        ////文件上传示例
        //public ActionResult SaveFile()
        //{
        //    return View();
        //}

        [HttpPost]
        public string SaveFile(HttpPostedFileBase image, string draft, int CustomerID, int BusinessUserID)
        {
            string result = "";
            string filename = image.FileName;
            string extname = filename.Substring(filename.LastIndexOf(".") + 1, (filename.Length - filename.LastIndexOf(".") - 1)); //扩展名

            DateTime dt = DateTime.Now;
            string ds = dt.ToString("yyyyMMddHHmmss");
            string newname = Convert.ToDouble(ds).ToString();
            string newfilename = newname + "." + extname;

            using (KutoEntities db = new KutoEntities())
            {
                //ObjectParameter re = new ObjectParameter("msg", typeof(string));
                var swfFileSystem = new KTFileSystem();
                if (swfFileSystem.SaveFile(ref image, path, newname))
                {
                    
                    if(db.spAddImg(newfilename, draft, CustomerID, BusinessUserID) == 0)
                    {
                        result = "[{\"{result\":\"true\",\"msg\":\"保存成功！\"}]";
                    }
                    else
                    {
                        result = "[{\"{result\":\"false\",\"msg\":\"数据库保存失败！\"}]";
                    }
                    
                }
                else
                {
                    result = "[{\"{result\":\"false\",\"msg\":\"" + swfFileSystem.strErrorMessage + "\"}]";
                }
            }

            

            return result;
        }




        [AcceptVerbs(HttpVerbs.Post)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings",
            Justification = "Needs to take same parameter type as Controller.Redirect()")]
        public ActionResult Login(string username, string pwd)
        {
            username = SqlZr.DelSQLStr(username);
            pwd = SqlZr.DelSQLStr(pwd);
            ObjectParameter re = new ObjectParameter("returnvalue", typeof(int));

            using (KutoEntities db = new KutoEntities())
            {
                var result1 = db.spSignin(username, pwd, re);
                var result2 = result1.GetNextResult<int>();
                var list1 = result1.ToList();

                if (re.Value.ToString() == "0")
                {
                    ViewData["username"] = username + "欢迎你!";
                    //result = true;
                    //Response.Write("<script>alert('登录成功！');</script>");
                    //Response.End();
                    return RedirectToAction("BusinessUserHome", new { BusinessUserID = 1 });
                     

                }
                else
                {

                    return View();
                }

            }

        }


        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public string GetCustomerPicList(int BusinessUserID)
        {
            int pageIndex, pageSize;
              
            //page是datagrid内部实现的，传过来的参数名。表示第几页
            if (!int.TryParse(Request.Form["page"], out pageIndex))
            {
                pageIndex = 1;
            } 

            //rows表示这一页显示多少条数据
            if (!int.TryParse(Request.Form["rows"], out pageSize))
            {
                pageSize = 5;
            } 

            
            ObjectParameter totalCount = new ObjectParameter("totalCount", typeof(int));
            ObjectParameter pageCount = new ObjectParameter("pageCount", typeof(int));

            using (KutoEntities db = new KutoEntities())
            {
                var ulist = db.spImgListforBusinessUser(BusinessUserID, pageIndex, pageSize, pageCount, totalCount).ToList();



                JavaScriptSerializer ser = new JavaScriptSerializer();
                return "{\"total\":" + totalCount.Value.ToString() + ",\"rows\":" + ser.Serialize(ulist) + "}";

             }
        }

        public ActionResult BusinessUserHome(int BusinessUserID)
        {
            ViewBag.BusinessUserID = BusinessUserID;
            var name = "";
            using (KutoEntities db = new KutoEntities())
            {
               name = (from t in db.Business_Users 
                            where t.id == BusinessUserID
                            select t).FirstOrDefault().username;
            }
            ViewBag.name = name;
            return View();
            

            }

        // GET: KutoAdmin/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

  
    }
}
