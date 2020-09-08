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

namespace Application.StoreItemBatches
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int StoreId { get; set; }
            public int ItemBatchId { get; set; }
            public int ItemCount { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.StoreId).GreaterThan(0);
                RuleFor(x => x.ItemBatchId).GreaterThan(0);
                RuleFor(x => x.ItemCount).GreaterThan(0);
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
                var storeItemBatch = _mapper.Map<Command, StoreItemBatch>(request);

                await _context.StoreItemBatches.AddAsync(storeItemBatch);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}