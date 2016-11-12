<issuetracker>
	<div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Issues</h3>
            </div>
            <div class="panel-body">
						<form onsubmit={ add }>
              <div class="row">
                <div class="col-md-3">
								<label> Select Priority
								</label>
                  <select class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div class="col-md-3"><div class = "form-group">
								<label> Choose Date
								</label>
								<input  type="text" placeholder="Chose date" id="datepicker" class="datepicker form-control"></input></div>
								</div>
                <div class="col-md-4">
									<div class = "form-group">
										<label>
												Describe your Issue
										</label>
										<textarea class="form-control" name="description"></textarea>
									</div>
								</div>
                <div class="col-md-2"><div class="form-group">
                    <label>
                     
                    </label>
                    <button class="form-control btn btn-primary" id = "save_issue">Create</button>
                  </div></div>
							
              </div>
							</form>
            </div>
          </div>
        </div>
      </div>
			
				<div class = "row">
				<div class = "col-md-12">
					<table class = "table table-bordered">
					
						<thead>
							<tr>
								<th>
									Done
								</th>
								<th>
									Description
								</th>
								<th>
									Date
								</th>
								<th>
									Delete
								</th>
							</tr>
						</thead>
						<tbody>
							<tr each={ issues } class = { completed: done}>
								<td>
								<!-- I have included a checkbox -->
								<div class="form-check">
									<label class="form-check-label">
										<input class="form-check-input" type="checkbox" value="" checked={ done } onclick = {parent.toggle}></input>
									</label>
								</div>
								</td>
								<td class = "description">
									{ description }
								</td>
								<td class = "date">
									{ date }
								</td>
								<td>
									<span class="glyphicon glyphicon-trash" aria-hidden="true" onclick = {parent.delete}></span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
	<script>
    var issueTrackerStorage = new Store('issues');

		this.issues = opts.issues;
		add(e) {
      this.issues.push({ client_id: guid(), description: this.description.value, date: this.datepicker.value });
      issueTrackerStorage.dump(this.issues);
			this.description.value = '';
			this.datepicker.value = ''; 
		}
		toggle(e){
			var item = e.item;
      item.done = !item.done;
      issueTrackerStorage.dump(this.issues);
			return true;
		}
		delete(e){
			this.issues = this.issues.filter(function(issue) {
				return e.item.client_id !== issue.client_id;
			});
    issueTrackerStorage.dump(this.issues);
		}
	</script>
</issuetracker>



