// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CustomViewProvider } from './custom-view-provider';
import { FileNotFoundEditorProvider } from './file-not-found-editor-provider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "theiawebviewsviewbug" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('theiawebviewsviewbug.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from TheiaWebviewsViewBug!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(
	vscode.window.registerWebviewViewProvider(CustomViewProvider.viewType, new CustomViewProvider(context.extensionUri), {
		webviewOptions: {
			retainContextWhenHidden: true,
		},
	}),
	)
	context.subscriptions.push(FileNotFoundEditorProvider.register(context))
}

// This method is called when your extension is deactivated
export function deactivate() {}
