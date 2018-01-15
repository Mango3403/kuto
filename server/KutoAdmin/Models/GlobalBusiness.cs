using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;
using System.IO;


namespace KutoAdmin.Models
{
    public class KTFileSystem
    {
        public string strErrorMessage = "";

        public static string Left(string sSource, int iLength)
        {
            return sSource.Substring(0, iLength > sSource.Length ? sSource.Length : iLength);
        }

        public static string Right(string sSource, int iLength)
        {
            return sSource.Substring(iLength > sSource.Length ? 0 : sSource.Length - iLength);
        }

        public static string Mid(string sSource, int iStart, int iLength)
        {
            int iStartPoint = iStart > sSource.Length ? sSource.Length : iStart;
            return sSource.Substring(iStartPoint, iStartPoint + iLength > sSource.Length ? sSource.Length - iStartPoint : iLength);
        }

        public Boolean CheckName(String Name)
        {

            Boolean Result = false;

            try
            {
                var myRegex = new Regex("^[0-9|a-z|A-Z|.|_| |-]*$");
                Match test = myRegex.Match(Name);

                Result = test.Success;

                if (Result)
                {
                    if (Name.Contains(".."))
                    {
                        Result = false;
                    }
                }
            }
            catch (Exception ex)
            {
                strErrorMessage = ex.Message;

            }

            return Result;

        }
        public Boolean CreateFolder(string FolderPath)
        {


            Boolean Result = false;
            try
            {
                string FolderName = String.Empty;
                if (Right(FolderPath, 1) == "\\")
                {
                    FolderName = FolderPath.Substring(FolderPath.Remove(FolderPath.LastIndexOf("\\") - 1, 1).LastIndexOf("\\") + 1, FolderPath.Length - FolderPath.Remove(FolderPath.LastIndexOf("\\") - 1, 1).LastIndexOf("\\") - 2);
                }
                else
                {
                    FolderName = FolderPath.Substring(FolderPath.LastIndexOf("\\") + 1, FolderPath.Length - FolderPath.LastIndexOf("\\") - 1);
                }
                if (CheckName(FolderName))
                {
                    if (System.IO.Directory.Exists(FolderPath) == false)
                    {
                        System.IO.Directory.CreateDirectory(FolderPath);
                        Result = true;
                    }
                    else
                    {
                        strErrorMessage = "Uh oh! You already have a folder with that name. You'll have to pick a different name.";
                        throw new Exception("Create failed! Folder " + FolderName + " already exists");
                    }
                }
                else
                {
                    strErrorMessage = "Uh oh! Folder name only allows the use of 'a-z', 'A-Z','0-9',' ','_','-' ";
                }
            }
            catch (Exception e)
            {

                if (strErrorMessage == "")
                {
                    strErrorMessage = "Uh oh! This folder can not be created.";
                }
            }



            return Result;

        }

        //<summary>
        //Same image file
        //</summary>
        //<param name="UploadedFile"></param>
        //<param name="SaveToLocation"></param>
        //<param name="NewFileName"></param>
        //<param name="AllowOverwrite"></param>
        //<param name="AllowNameRestriction"></param>
        //<param name="ProtectedFolder"></param>
        //<returns></returns>
        //<remarks></remarks>
        public Boolean SaveFile(ref HttpPostedFileBase UploadedFile, String SaveToLocation, String NewFileName)
        {
            Boolean Result = false;
            string strExtension = Path.GetExtension(UploadedFile.FileName).ToLower();
            //string blockedFileType = ".bat, .bin, .cmd, .com, .exe, .config, .msi, .msp, .mst, .asp, .aspx, .ashx, .asmx, .ascx";



            // defect if restricted file type
            //if (blockedFileType.Contains(strExtension)) {
            //    strErrorMessage = "Uh oh! " & UploadedFile.FileName & " could not be uploaded.";
            //    return false;
            //}

            try
            {
                if (!(System.IO.Directory.Exists(SaveToLocation)))
                {
                    System.IO.Directory.CreateDirectory(SaveToLocation);

                }

                UploadedFile.SaveAs(Path.Combine(SaveToLocation, NewFileName + strExtension));
                Result = true;
            }
            catch (Exception ex)
            {
                if (strErrorMessage == "")
                {
                    strErrorMessage = "Uh oh! " + UploadedFile.FileName + " could not be uploaded.";
                }
            }

            return Result;
        }
    }

    public class SqlZr
    {
        public SqlZr()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
        }
        public static string DelSQLStr(string str)
        {
            if (str == null || str == "")
                return "";
            str = str.Replace(";", "");
            str = str.Replace("'", "");
            str = str.Replace("&", "");
            str = str.Replace("%20", "");
            str = str.Replace("--", "");
            str = str.Replace("==", "");
            str = str.Replace("<", "");
            str = str.Replace(">", "");
            str = str.Replace("%", "");
            str = str.Replace("+", "");
            str = str.Replace("-", "");
            str = str.Replace("=", "");
            str = str.Replace(",", "");
            return str;
        }
    }
}