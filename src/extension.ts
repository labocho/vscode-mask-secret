// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('mask-secret.maskSecret', () => {
		function mask(secret: string, m: string) {
			return secret.replace(/[a-zA-Z0-9]/g, m);
		}

		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) { return; }

		editor.edit((edit) => {
			if (editor.selections.length === 0) {
				vscode.window.showWarningMessage("No selection found");
				return;
			}

			for (let selection of editor.selections) {
				const range = selection.with();
				const secret = editor.document.getText(range);
				const masked = mask(secret, "X");
				edit.replace(range, masked);
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
