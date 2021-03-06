using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KutoAdmin.Models;
using System.Data.Entity.Core.Objects;
using System.Web.Script.Serialization;
using System.IO;
using Newtonsoft.Json;

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

            ObjectParameter CustomerID = new ObjectParameter("CustomerID", typeof(int));
            using (KutoEntities db = new KutoEntities())
            {
                db.spInsertCustomer(name, mobile, LONG, lat, address, CustomerID);
                string cid = CustomerID.Value.ToString();
                if (int.Parse(cid) > 0)
                {
                    result = "[{\"result\":\"true\",\"CustomerID\":\"" + cid + "\",\"msg\":\"保存成功！\"}]";
                }
                else
                    result = "[{\"result\":\"false\",\"msg\":\"保存失败！\"}]";
            }
            return result;
        }

        [HttpPost]
        public string EditImg(HttpPostedFileBase image, string draft)
        {
            string result = "";
            ObjectParameter msg = new ObjectParameter("msg", typeof(string));

            var swfFileSystem = new KTFileSystem();
            if (swfFileSystem.SaveFile(ref image, path, image.FileName))
            {
                using (KutoEntities db = new KutoEntities())
                {
                    db.spEditImg(image.FileName, draft, msg);
                    if (msg.Value.ToString() == "ok")
                    {
                        result = "[{\"result\":\"true\",\"msg\":\"保存成功！\"}]";
                    }
                    else
                    {
                        result = "[{\"result\":\"false\",\"msg\":\"数据库保存失败！\"}]";
                    }
                }
            }
            else
            {
                result = "[{\"result\":\"false\",\"msg\":\"" + swfFileSystem.strErrorMessage + "\"}]";
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
                ObjectParameter returnvalue = new ObjectParameter("returnvalue", typeof(int));

                var swfFileSystem = new KTFileSystem();
                if (swfFileSystem.SaveFile(ref image, path, newname))
                {
                    db.spAddImg(newfilename, draft, CustomerID, BusinessUserID, returnvalue);
                    if ((int)returnvalue.Value == 0)
                    {
                        result = "[{\"result\":\"true\",\"msg\":\"保存成功！\"}]";
                    }
                    else
                    {
                        result = "[{\"result\":\"false\",\"msg\":\"数据库保存失败！\"}]";
                    }
                }
                else
                {
                    result = "[{\"result\":\"false\",\"msg\":\"" + swfFileSystem.strErrorMessage + "\"}]";
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
                var id = 0;
                id = (from t in db.Business_Users
                        where t.username == username
                        select t).FirstOrDefault().id;

                Session["UserName"] = username.ToString();
                Session["UserID"] = id.ToString();

                if (re.Value.ToString() == "0")
                {
                    ViewData["username"] = username + "欢迎你!";
                    //result = true;
                    //Response.Write("<script>alert('登录成功！');</script>");
                    //Response.End();
                    return RedirectToAction("BusinessUserHome", new { BusinessUserID = id });
                }
                else
                {
                    ViewBag.ErrorMessage = "用户名或密码错误";
                    return View();
                }

            }

        }

        //public ActionResult InsertCustomer()
        //{
        //    return View();
        //}

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

        public ActionResult Logout()
        {
            Session["UserID"] = "";
            Session["UserName"] = "";
            return RedirectToAction("Login", "KutoAdmin");
        }

        public ActionResult BusinessUserHome(int BusinessUserID)
        {
            if(Session["UserID"].ToString() == BusinessUserID.ToString())
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
            else
            {
                 return RedirectToAction("Login","KutoAdmin");
            }


        }

        // GET: KutoAdmin/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        public ActionResult GenImgLibJson()
        {
            // 获取当前程序所在路径，并将要创建的文件命名为info.json 
            string galleryDir = Server.MapPath("..\\static\\imglib\\");
            ViewBag.galleryDir = galleryDir;
            string galleryCfg = galleryDir + "\\gallery.json";

            createFile(galleryCfg);

            List<Gallery> galleryList = new List<Gallery>();
            enumDir(galleryList, null, new DirectoryInfo(galleryDir));

            //写入序列化的json
            System.IO.File.WriteAllText(galleryCfg, JsonConvert.SerializeObject(galleryList));
            return View();
        }


        private void enumDir(List<Gallery> galleryList, Gallery supperGallery, DirectoryInfo directory)
        {
            DirectoryInfo[] directorys = directory.GetDirectories();
            FileInfo[] files;
            foreach (DirectoryInfo di in directorys)
            {
                Gallery gallery = new Gallery(); //动态类型字段 可读可写
                gallery.name = di.Name;
                gallery.subDirs = new List<Gallery>();
                if (supperGallery == null)
                {
                    galleryList.Add(gallery);
                    ViewBag.dirName = gallery.name;
                }
                else
                {
                    supperGallery.subDirs.Add(gallery);
                }

                enumDir(galleryList, gallery, di);
            }

            files = directory.GetFiles();
            List<string> imgList = new List<string>();

            foreach (FileInfo file in files)
            {
                if (file.Extension != ".json")
                    imgList.Add(file.Name);
            }

            string listJson = directory.FullName + "\\list.json";
            createFile(listJson);
            System.IO.File.WriteAllText(listJson, JsonConvert.SerializeObject(imgList));
        }

        private void createFile(string path)
        {
            if (System.IO.File.Exists(path))  // 判断是否已有相同文件 
            {
                System.IO.File.Delete(path);
            }

            //创建文件
            FileStream fs1 = new FileStream(path, FileMode.Create, FileAccess.ReadWrite);
            fs1.Close();
        }
    }

    class Gallery
    {
        public string name;
        public List<Gallery> subDirs;

        public Gallery()
        {
            subDirs = new List<Gallery>();
        }
    }
}
