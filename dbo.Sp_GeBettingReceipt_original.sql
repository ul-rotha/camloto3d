USE [CamLotto3]
GO

/****** Object: SqlProcedure [dbo].[Sp_GeBettingReceipt] Script Date: 6/24/2022 5:30:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Sp_GeBettingReceipt] 
	-- Add the parameters for the stored procedure here
	@BettingID int

AS
BEGIN




BEGIN TRAN
	declare @CurrentDate datetime = dbo.getCurrentDateTime()
	


	select bb.BettingID,bb.BetNumber,bb.SlotNumber,bb.BetAmount,bb.TotalBet,bb.CreatedDate,bb.CreatedBy, bb.GameID, bb.PlaceID
	, isnull(bb.Withdrawal,0) as Withdrawal,case when bb.WithdrawalDate is null then '' else convert(varchar,bb.WithdrawalDate,121) end as WithdrawalDate, isnull(bb.WithdrawalBy,'') as WithdrawalBy	
	from tblBetting bb
	where bb.BettingID=@BettingID
	

	
	IF (@@ERROR <> 0) BEGIN
        select 'Failed' as Status

		ROLLBACK TRAN        
	END
   
COMMIT TRAN	
		

	

END
