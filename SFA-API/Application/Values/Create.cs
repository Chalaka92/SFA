using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Values
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
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
                var value = _mapper.Map<Command, Value>(request);

                _context.Values.Add(value);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}