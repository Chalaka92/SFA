using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Targets
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int ItemId { get; set; }
            public string TargetCode { get; set; }
            public int TimePeriod { get; set; }
            public DateTime TimeStartFrom { get; set; }
            public DateTime TimeEndTo { get; set; }
            public int Quantity { get; set; }
            public decimal Amount { get; set; }
            public decimal CommisionAmount { get; set; }
            public decimal CommisionRate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.TimePeriod).GreaterThan(0);
                RuleFor(x => x.Quantity).GreaterThan(0);
                RuleFor(x => x.Amount).GreaterThan(0);
                RuleFor(x => x.CommisionAmount).GreaterThan(0);
                RuleFor(x => x.CommisionRate).GreaterThan(0);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var target = await _context.Targets.FindAsync(request.Id);

                if (target == null)
                    throw new RestException(HttpStatusCode.NotFound, new { target = "Not Found" });

                target.ItemId = request.ItemId == 0 ? target.ItemId : request.ItemId;
                target.TimePeriod = request.TimePeriod;
                target.TimeStartFrom = request.TimeStartFrom;
                target.TimeEndTo = request.TimeEndTo;
                target.Quantity = request.Quantity;
                target.Amount = request.Amount;
                target.CommisionAmount = request.CommisionAmount;
                target.CommisionRate = request.CommisionRate;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}