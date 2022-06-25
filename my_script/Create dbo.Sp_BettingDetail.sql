USE [CamLotto3]
GO

/****** Object: SqlProcedure [dbo].[Sp_BettingDetail] Script Date: 6/24/2022 5:32:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Sp_BettingDetail] 
	-- Add the parameters for the stored procedure here
	@BettingID int
AS
BEGIN

If(OBJECT_ID('tempdb..#temp_list') Is Not Null)
Begin
    Drop Table #temp_list
End


declare @UnitWin int
set @UnitWin=90


BEGIN TRAN

declare @RemainBalance float
declare @CurrentDate date = dbo.getCurrentDateTime()

set @RemainBalance = isnull(( select sum(RemainingBalance) as Balance from tblBalance where BalanceDate = @CurrentDate),0)

set @RemainBalance=0


	Create table #temp_list(GameID int, PlaceID int,BettingID int,SlotNumber varchar(50),BetType varchar(50),BetNumber varchar(50),BetAmount float,UnitWinAmount float,WinAmount float,TotalBet float)

	DECLARE @GameID int,@PlaceID int,@SlotNumber nvarchar(50),@BetType varchar(50),@BetNumber varchar(450),@BetAmount float,@UnitWinAmount float,@WinAmount float,@TotalBet float

		DECLARE @IndexHelper int = 0;
	-------Series X------------
		DECLARE @BettingList CURSOR
		SET @BettingList = CURSOR FOR

			select GameID,PlaceID,SlotNumber,BetType,1 as BetNumber,BetAmount, 0, 0,TotalBet
			from tblBetting where BettingID=@BettingID  and BetNumber like '%1%'
			union
			select GameID,PlaceID,SlotNumber,BetType,2 as BetNumber,BetAmount, 0, 0,TotalBet
			from tblBetting where BettingID=@BettingID  and BetNumber like '%2%'
			union
			select GameID,PlaceID,SlotNumber,BetType,3 as BetNumber,BetAmount, 0, 0,TotalBet
			from tblBetting where BettingID=@BettingID  and BetNumber like '%3%'

		OPEN @BettingList
		FETCH NEXT
		FROM @BettingList INTO  @GameID,@PlaceID ,@SlotNumber ,@BetType,@BetNumber,@BetAmount,@UnitWinAmount,@WinAmount,@TotalBet
		WHILE @@FETCH_STATUS = 0
		BEGIN
			SET @IndexHelper = @IndexHelper + 1;

			SET @BetAmount =  (SELECT A.Amount FROM 
									(SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 1)) AS [Index], Item AS [Amount]
									 FROM dbo.SplitNumber(@SlotNumber, ',')
									 ) 
								A WHERE A.[Index] = @IndexHelper);

			INSERT INTO #temp_list(GameID,PlaceID,BettingID,SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet)
			SELECT @GameID,@PlaceID,@BettingID,@SlotNumber,@BetType,@BetNumber,@BetAmount,@UnitWin,@BetAmount,@TotalBet
					
		FETCH NEXT
		FROM @BettingList INTO @GameID,@PlaceID ,@SlotNumber,@BetType,@BetNumber,@BetAmount,@UnitWinAmount,@WinAmount,@TotalBet
		END
		CLOSE @BettingList
		DEALLOCATE @BettingList

		----------------------------
		
		INSERT INTO tblBettingDetail(BettingID, GameID, PlaceID, SlotNumber, BetType, BetNumber, BetAmount, UnitWinAmount, WinAmount, TotalBet, CreatedDate, CreatedBy)
		select BettingID,GameID,PlaceID,SlotNumber, BetType, BetNumber,BetAmount, 0, 0,TotalBet,@CurrentDate,'chanpheakdey.vong' 
		from #temp_list

IF (@@ERROR <> 0) BEGIN
        PRINT 'Unexpected error occurred!'

		ROLLBACK TRAN        
	END
   
COMMIT TRAN	

If(OBJECT_ID('tempdb..#temp_list') Is Not Null)
Begin
    Drop Table #temp_list
End
	

END
