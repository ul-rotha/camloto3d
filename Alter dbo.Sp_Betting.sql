USE [CamLotto3]
GO

/****** Object: SqlProcedure [dbo].[Sp_Betting] Script Date: 6/23/2022 9:15:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Sp_Betting] 
	-- Add the parameters for the stored procedure here
	@GameID int, @PlaceID int, @SlotNumber varchar(250), @BetType varchar(50), @BetNumber varchar(450), @BetAmount int, @UnitWinAmount int,
	@WinAmount int, @TotalBet int, @CreatedBy varchar(250)

AS
BEGIN

If(OBJECT_ID('tempdb..#temp_list') Is Not Null)
Begin
    Drop Table #temp_list
End



declare @Item varchar(50)=''
declare @NewString varchar(500)=''
declare @CountNumbers int=0

DECLARE @BettingList CURSOR
SET @BettingList = CURSOR FOR

	select distinct case when convert(int,item)<10 then convert(int,item) else item end as Item  from dbo.SplitNumber(@BetNumber,',')


OPEN @BettingList
FETCH NEXT
FROM @BettingList INTO @Item
WHILE @@FETCH_STATUS = 0
BEGIN
	set @CountNumbers = @CountNumbers + 1		
	set @NewString += @Item + ','
				
FETCH NEXT
FROM @BettingList INTO @Item
END
CLOSE @BettingList
DEALLOCATE @BettingList


set @NewString = substring(@NewString,1,len(@NewString)-1)

declare @Numbersofslot int = (SELECT LEN(@SlotNumber) - LEN(REPLACE(@SlotNumber, ',', '')) + 1)
set @TotalBet = @CountNumbers * @BetAmount * @Numbersofslot 

set @UnitWinAmount=90


BEGIN TRAN
	declare @CurrentDate datetime = dbo.getCurrentDateTime()
	
	declare @BettingEnd bit=(select isnull(BettingEnd,0) as BettingEnd from tblGame where GameID=@GameID)

	declare @CurrentCredit int = (select top(1)Credit from tblUser where Username=@CreatedBy and isnull(deleted,0)=0)

	if @CurrentCredit<@TotalBet
		begin
			SELECT -2 as BettingID, @GameID as GameID, @CurrentDate as CreatedDate, 'Out of credit' as Status
		end
	else
		begin
			declare @NewBanlance int =  0
			set @NewBanlance = @CurrentCredit-@TotalBet
			if @BettingEnd =1
				begin
					 SELECT 0 as BettingID, @GameID as GameID, @CurrentDate as CreatedDate, 'Betting End' as Status
				end
			else
				begin
					insert into tblBetting(GameID,PlaceID, SlotNumber, BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet,CreatedDate,CreatedBy,CurrentBalance, NewBalance)
					values(@GameID,@PlaceID,@SlotNumber,@BetType,@NewString,@BetAmount,@UnitWinAmount,@WinAmount,@TotalBet,@CurrentDate,@CreatedBy, @CurrentCredit, @NewBanlance)

					update tblUser set Credit= @NewBanlance where Username =@CreatedBy

					 SELECT convert(int, SCOPE_IDENTITY()) as BettingID, @GameID as GameID, @CurrentDate as CreatedDate, 'Success' as Status
			
					declare @newBettingID int = convert(int, SCOPE_IDENTITY())

					EXEC [dbo].[Sp_BettingDetail] @BettingID = @newBettingID
				end
		end

	

	IF (@@ERROR <> 0) BEGIN
        select 'Failed' as Status

		ROLLBACK TRAN        
	END
   
COMMIT TRAN	
		

	

END
