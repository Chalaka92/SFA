using System.Collections.Generic;
using System.Threading.Tasks;
using Application.SalesRepItemBatches;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SalesRepItemBatchController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<SalesRepItemBatchDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("ListBySalesRepId/{salesRepId}")]
        public async Task<ActionResult<List<SalesRepItemBatchDto>>> ListBySalesRepId(int salesRepId)
        {
            return await Mediator.Send(new ListBySalesRepId.Query { SalesRepId = salesRepId });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SalesRepItemBatchDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}