using Gambling;
using Gambling.Hubs;
using SignalR.MessageWorker;
using SignalR.Classes;
using GameAPI.App_Code;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHostedService<messageworker>();
//builder.Services.AddHostedService<BroadCastService>();
builder.Services.AddRazorPages();

builder.Services.AddSignalR(hubOption =>
{
    hubOption.EnableDetailedErrors = true;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("https://localhost:7111/");
                          //builder.AllowAnyOrigin();
                          builder.AllowAnyMethod();
                          builder.AllowAnyHeader();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins);
app.MapRazorPages();
app.MapHub<ChatHub>("/chatHub");

app.MapPost("api/betting", (ClBetting clbetting) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.Betting(clbetting);

});
app.MapPost("api/userlogin", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UserLogin(clUser);

});
app.MapPost("api/userloginbytoken", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UserLoginbyToken(clToken);

});


app.MapPost("api/logout", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UserLogout(clToken);

});

app.MapGet("api/getusercredit/{username}", async (http) =>
{
    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }


    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getUserCredit(username.ToString());
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});


app.MapPost("api/createuser", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.CreateUser(clUser);

});
app.MapPost("api/deleteuser", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.DeleteUser(clUser);

});

app.MapPost("api/unlockuser", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UnlockUser(clUser);

});

app.MapPost("api/updatePassword", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UpdatePassword(clUser);

});
app.MapPost("api/updateusername", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UpdateUsername(clUser);

});
app.MapPost("api/changepassword", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.ChangePassword(clUser);

});

app.MapPost("api/updatenickname", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UpdateNickname(clUser);

});

app.MapGet("api/QRCode/{bettingid}", async (http) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    //return dalGlobal.GetBettingResult(clbetting);

    object? bettingid;
    if (!http.Request.RouteValues.TryGetValue("bettingid", out bettingid))
    {
        http.Response.StatusCode = 400;
        return;
    }



    var todoItem = await dalGlobal.getQRCode(bettingid);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);


});


app.MapPost("api/LatestResult", () =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.getLatestResult();

});
app.MapPost("api/getCurrentGame", () =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.getCurrentGame();

});



app.MapPost("api/UploadImage", (IFormFile file) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    //return dalGlobal.UploadFile(file);

});

app.MapGet("api/getbettingresult/{bettingid}", async (http) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    //return dalGlobal.GetBettingResult(clbetting);

    object? bettingid;
    if (!http.Request.RouteValues.TryGetValue("bettingid", out bettingid))
    {
        http.Response.StatusCode = 400;
        return;
    }



    var todoItem = await dalGlobal.GetBettingResult(bettingid);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);


});


app.MapGet("api/getbettingreceipt/{bettingid}", async (http) =>
{
    object? bettingid;
    if (!http.Request.RouteValues.TryGetValue("bettingid", out bettingid))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.GetBettingReceipt(bettingid);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});


app.MapPost("api/withdraw", (ClBettingResult clbetting) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.Withdraw(clbetting);

});

app.MapPost("api/WithdrawUrl", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.WithdrawUrl(clUser);

});

app.MapPost("api/CheckToken", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.CheckToken(clToken);

});

app.MapPost("api/CheckTokenDetail", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.CheckTokenDetail(clToken);

});
app.MapGet("api/getHistoryNotyetwithdraw/{startdate}/{enddate}/{username}", async (http) =>
{
    object? startdate;
    if (!http.Request.RouteValues.TryGetValue("startdate", out startdate))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? enddate;
    if (!http.Request.RouteValues.TryGetValue("enddate", out enddate))
    {
        http.Response.StatusCode = 400;
        return;
    }

    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getHistoryNotyetwithdraw(startdate, enddate, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getHistorywithdraw/{startdate}/{enddate}/{username}", async (http) =>
{
    object? startdate;
    if (!http.Request.RouteValues.TryGetValue("startdate", out startdate))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? enddate;
    if (!http.Request.RouteValues.TryGetValue("enddate", out enddate))
    {
        http.Response.StatusCode = 400;
        return;
    }

    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getHistorywithdraw(startdate, enddate, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});


app.MapGet("api/getReportBalance/{startdate}/{enddate}/{username}", async (http) =>
{
    object? startdate;
    if (!http.Request.RouteValues.TryGetValue("startdate", out startdate))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? enddate;
    if (!http.Request.RouteValues.TryGetValue("enddate", out enddate))
    {
        http.Response.StatusCode = 400;
        return;
    }

    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getReportBalance(startdate, enddate, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getReportUnderSale/{startdate}/{enddate}/{username}", async (http) =>
{
    object? startdate;
    if (!http.Request.RouteValues.TryGetValue("startdate", out startdate))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? enddate;
    if (!http.Request.RouteValues.TryGetValue("enddate", out enddate))
    {
        http.Response.StatusCode = 400;
        return;
    }

    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getReportUnderSale(startdate, enddate, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getReport/{startdate}/{enddate}/{username}", async (http) =>
{
    object? startdate;
    if (!http.Request.RouteValues.TryGetValue("startdate", out startdate))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? enddate;
    if (!http.Request.RouteValues.TryGetValue("enddate", out enddate))
    {
        http.Response.StatusCode = 400;
        return;
    }

    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getReport(startdate, enddate, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});




app.MapGet("api/getToken/{username}", async (http) =>
{
    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }


    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getToken(username.ToString());
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getnewToken/{token}", async (http) =>
{
    object? token;
    if (!http.Request.RouteValues.TryGetValue("token", out token))
    {
        http.Response.StatusCode = 400;
        return;
    }


    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getnewToken(token.ToString());
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getuserlist/{username}", async (http) =>
{
    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }


    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getUserlist(username.ToString());
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});


app.MapGet("api/getauido/{filename}", async (http) =>
{
    object? filename;
    if (!http.Request.RouteValues.TryGetValue("filename", out filename))
    {
        http.Response.StatusCode = 400;
        return;
    }


    //await http.Response.WriteAsync(fs);
    DalGlobal dalGlobal = new DalGlobal();
    //await dalGlobal.GetAudio(filename.ToString());
    await http.Response.WriteAsJsonAsync(dalGlobal.GetAudio(filename.ToString()));
});


app.MapGet("api/getHistory/{bettype}/{username}", async (http) =>
{
    object? bettype;
    if (!http.Request.RouteValues.TryGetValue("bettype", out bettype))
    {
        http.Response.StatusCode = 400;
        return;
    }

    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getHistory(bettype, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});


app.MapGet("api/getHistorybyGameID/{gameid}/{username}", async (http) =>
{
    object? gameid;
    if (!http.Request.RouteValues.TryGetValue("gameid", out gameid))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getHistorybyGameID(gameid, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});


app.MapGet("api/getUserCreditHistory/{username}", async (http) =>
{


    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getUserCreditHistory(username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getUserDocument/{username}", async (http) =>
{


    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getUserDocument(username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapPost("api/addcredit", (UserCredit userCredit) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.AddCredit(userCredit);

});

app.MapPost("api/deletedocument", (UserDocument userDocument) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.DeleteDocument(userDocument);

});


app.MapGet("api/getResult/{startdate}/{enddate}/{username}", async (http) =>
{
    object? startdate;
    if (!http.Request.RouteValues.TryGetValue("startdate", out startdate))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? enddate;
    if (!http.Request.RouteValues.TryGetValue("enddate", out enddate))
    {
        http.Response.StatusCode = 400;
        return;
    }

    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = dalGlobal.getResultbyDate(startdate, enddate, username);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getuserlistbylevel/{createdby}/{userlevel}", async (http) =>
{
    object? createdby;
    if (!http.Request.RouteValues.TryGetValue("createdby", out createdby))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? userlevel;
    if (!http.Request.RouteValues.TryGetValue("userlevel", out userlevel))
    {
        http.Response.StatusCode = 400;
        return;
    }

    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = dalGlobal.getuserlistbylevel(createdby, userlevel);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});



app.Run();
