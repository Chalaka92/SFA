using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string LoginEmail { get; set; }
            public int Id { get; set; }
            public int ShopId { get; set; }
            public int SalesRepId { get; set; }
            public string OrderCode { get; set; }
            public decimal TotalAmount { get; set; }
            public bool IsComplete { get; set; }
            public DateTime? CompletedDate { get; set; }
            public DateTime OrderedDate { get; set; }
            public bool IsEdit { get; set; }
            public DateTime? EditedDate { get; set; }
            public int EditedUserId { get; set; }
            public bool IsCancel { get; set; }
            public DateTime? CanceledDate { get; set; }
            public int CanceledUserId { get; set; }
            public string CanceledReason { get; set; }
            public bool IsSync { get; set; }
            public DateTime? SyncedDate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.LoginEmail).NotEmpty();
                RuleFor(x => x.ShopId).GreaterThan(0);
                RuleFor(x => x.SalesRepId).GreaterThan(0);
                RuleFor(x => x.TotalAmount).GreaterThan(0);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FindAsync(request.Id);
                var loggedUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                var userDetail = await _context.UserDetails.Where(x => x.LoggedUserId == loggedUser.Id).FirstOrDefaultAsync();

                if (order == null)
                    throw new RestException(HttpStatusCode.NotFound, new { order = "Not Found" });

                order.ShopId = request.ShopId == 0 ? order.ShopId : request.ShopId;
                order.SalesRepId = request.SalesRepId == 0 ? order.SalesRepId : request.SalesRepId;
                order.TotalAmount = request.TotalAmount;
                order.IsComplete = request.IsComplete;
                order.CompletedDate = request.CompletedDate;
                if (request.IsEdit)
                {
                    order.IsEdit = request.IsEdit;
                    order.EditedDate = request.EditedDate;
                    order.EditedUserId = userDetail.Id;
                }
                if (request.IsCancel)
                {
                    order.IsCancel = request.IsCancel;
                    order.CanceledDate = request.CanceledDate;
                    order.CanceledUserId = userDetail.Id;
                    order.CanceledReason = request.CanceledReason;
                }
                order.IsSync = request.IsSync;
                order.SyncedDate = request.SyncedDate;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}