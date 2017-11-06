using Microsoft.VisualStudio.TestTools.UnitTesting;
using KutoAdmin.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KutoAdmin.Controllers.Tests
{
    [TestClass()]
    public class KutoAdminControllerTests
    {
        [TestMethod()]
        public void InsertCustomerTest()
        {
            var kac =new KutoAdminController();
            string id=kac.InsertCustomer("max", "12344334", 1, 1, "aaaa");
            Assert.IsTrue(id.GetType()== typeof(int));
        }
    }
}