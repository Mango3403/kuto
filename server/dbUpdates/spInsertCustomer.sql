USE [Kuto]
GO
/****** Object:  StoredProcedure [users].[spInsertCustomer]    Script Date: 2017/11/6 11:56:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Mei
-- Create date: 2017/10/19
-- Description:	保存用户信息
-- =============================================
ALTER PROCEDURE [users].[spInsertCustomer] --'aa','122',2222,22,'vdvfv'  --'TB21JXPh4FjSZFq.jpg','133',''
 @name NVARCHAR(5),
 @mobile VARCHAR(15),
 @LONG float,
 @lat float,
 @address NVARCHAR(50),
 @CustomerID int output
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select @CustomerID=id from [users].[Customers] where mobile = @mobile

	if @CustomerID>0 return

	else

	begin try

		 
		begin tran
			insert into [users].[Customers](name, mobile, [LONG.], [lat.], [address])
			values(@name, @mobile,@LONG, @lat, @address)
			 
			set @CustomerID = @@IDENTITY
		commit tran
		
		 
 
	end try

	begin catch
		
		rollback tran
		 
	end catch
END
 