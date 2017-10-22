import { Render, Component } from "pyrite";

@Component(function (this: Input) {
	return (
		<div class="form-group col-5">
			<div class="input-group">
				<span class="input-group-addon">{this.title}</span>
				<input 
					type="text"
					class="form-control"
					placeholder={this.title}
					value={this.message[this.field]}
					onkeypress={this.onEnter.bind(this)}
					oninput={(event: any) => this.message[this.field] = event.target.value} />
			</div>
		</div>
	);
})
export class Input {
	title: string;
	field: string;
	message: any;
	onenter: any;

	onEnter(event: any) {
		if (event.keyCode === 13) this.onenter();
	} 
}