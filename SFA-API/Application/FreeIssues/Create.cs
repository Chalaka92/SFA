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

namespace Application.FreeIssues
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string FreeIssueCode { get; set; }
            public int ExtraQuantity { get; set; }
            public int MinimumQuantity { get; set; }
            public bool IsCustomer { get; set; }
            public bool IsShopOwner { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
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
                var freeIssue = _mapper.Map<Command, FreeIssue>(request);
                var freeIssueCode = "fi0001";

                if (await _context.FreeIssues.AnyAsync())
                {
                    freeIssueCode = "fi" + (_context.FreeIssues.AsEnumerable().Max(x => Convert.ToInt32(x.FreeIssueCode)) + 1).ToString("D4");
                }
                freeIssue.FreeIssueCode = freeIssueCode;

                await _context.FreeIssues.AddAsync(freeIssue);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}