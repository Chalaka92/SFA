using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Targets
{
    public class Create
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var target = _mapper.Map<Command, Target>(request);
                var item = await _context.Items.FindAsync(request.ItemId);
                var targetCode = "tgt" + item.ItemCode.Replace("itmcat", "") + "001";

                if (await _context.Targets.AnyAsync())
                {
                    targetCode = (_context.Targets.AsEnumerable().Where(x => x.TargetCode.Substring(0, x.TargetCode.Length - 4) == "tgt" + item.ItemCode.Replace("itmcat", ""))
                        .Max(x => Convert.ToInt32(x.TargetCode.Substring(x.TargetCode.Length - 3, 3))) + 1).ToString("D3");
                }
                target.TargetCode = targetCode;

                await _context.Targets.AddAsync(target);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}