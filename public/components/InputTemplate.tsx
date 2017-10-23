import { Render } from "pyrite";
import { Input } from "./Input";

export function InputTemplate(this: Input) {
	return (
		<div class="form-group col-5">
			<div class="input-group">
				{this.children}
				<input 
					type="text"
					class="form-control"
					placeholder={this.attrs.title}
					value={this.attrs.message[this.attrs.field]}
					onkeypress={this.onEnter.bind(this)}
					oninput={(event: any) => this.attrs.message[this.attrs.field] = event.target.value} />
			</div>
		</div>
	);
}