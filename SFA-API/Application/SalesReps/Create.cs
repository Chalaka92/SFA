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

namespace Application.SalesReps
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public string SalesRepCode { get; set; }
            public int AssignedAreaId { get; set; }
            public int AssignedStoreId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).GreaterThan(0);
                RuleFor(x => x.AssignedAreaId).GreaterThan(0);
                RuleFor(x => x.AssignedStoreId).GreaterThan(0);
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
                var salesRep = _mapper.Map<Command, SalesRep>(request);
                var userDetails = await _context.UserDetails.FindAsync(request.UserId);
                var salesRepCode = "sr" + userDetails.UserCode;

                salesRep.SalesRepCode = salesRepCode;

                await _context.SalesReps.AddAsync(salesRep);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}