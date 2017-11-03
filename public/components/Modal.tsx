import { Component, Attributes, Children, Refs, Render } from "pyrite";
import * as $ from "jquery";
import "./ModalStyles.scss";

interface ModalAttributes {
	customHeader: any;
	customFooter: any;
	onSuccess: Function;
}

interface ModalRefs {
	modal: any;
}


@Component(function(this: Modal) {
	const defaultHeader = (
		<div>
			<button type="button" class="close" onclick={this.close.bind(this)} aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			<h4 class="modal-title text">Modal title</h4>
		</div>
	);

	const customFooter = (
		<div>
			<button type="button" class="btn btn-default" onclick={this.close.bind(this)}>Close</button>
			<button type="button" class="btn btn-primary" onclick={this.save.bind(this)}>Save changes</button>
		</div>
	);

	return (
		<div class="modal-component">
			<div ref="modal" class="modal fade" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							{this.attrs.customHeader ? this.attrs.customHeader: defaultHeader}
						</div>
						<div class="modal-body">
							{this.children}
					  	</div>
					  	<div class="modal-footer">
							{this.attrs.customFooter ? this.attrs.customFooter: customFooter}
					  	</div>
					</div>
			  	</div>
			</div>
		</div>
	);
})
export class Modal {
	@Attributes attrs: ModalAttributes;
	@Refs refs: ModalRefs;
	@Children children: Array<HTMLElement>;

	open() {
		$(this.refs.modal).modal('show');
	}

	close() {
		$(this.refs.modal).modal('hide');
	}

	save() {
		alert("saving....");
		this.close();
		this.attrs.onSuccess();
	}
}