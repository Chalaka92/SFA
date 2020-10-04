using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SalesRepItemBatches
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int SalesRepId { get; set; }
            public int ItemBatchId { get; set; }
            public int ItemCount { get; set; }
            public int StoreId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.SalesRepId).GreaterThan(0);
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
                var salesRepItemBatch = _mapper.Map<Command, SalesRepItemBatch>(request);

                await _context.SalesRepItemBatches.AddAsync(salesRepItemBatch);

                //Update Store Item Batch
                var storeItemBatch = await _context.StoreItemBatches.Where(x => x.ItemBatchId == request.ItemBatchId).FirstOrDefaultAsync();
                storeItemBatch.ItemCount = storeItemBatch.ItemCount - request.ItemCount;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}