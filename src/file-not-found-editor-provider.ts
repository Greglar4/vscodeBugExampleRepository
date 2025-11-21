import * as vscode from 'vscode'

export class FileNotFoundEditorProvider implements vscode.CustomTextEditorProvider {
	private static readonly viewType = 'example.fileNotFound'
	private webviewPanels: { webviewPanel: vscode.WebviewPanel; uri: string }[] = []

	public static register(
		context: vscode.ExtensionContext,
	): vscode.Disposable {
		const provider = new FileNotFoundEditorProvider(context)
		return vscode.window.registerCustomEditorProvider(FileNotFoundEditorProvider.viewType, provider, {
			webviewOptions: {
				retainContextWhenHidden: true,
			},
		})
	}

	constructor(
		private readonly context: vscode.ExtensionContext,
	) {
	}

	public resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel): void {
		webviewPanel.webview.options = {
			enableScripts: true,
			localResourceRoots: [this.context.extensionUri],
		}
		console.log('Resolving custom editor')
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview)

		this.webviewPanels.push({ webviewPanel: webviewPanel, uri: document.uri.toString(true) })

		webviewPanel.onDidDispose(() => {
			this.webviewPanels = this.webviewPanels.filter((panel) => panel.webviewPanel !== webviewPanel)
		})

		webviewPanel.webview.onDidReceiveMessage((message) => {
			if (message === 'delete') {
				vscode.workspace.fs.delete(document.uri)
			}
		})
	}

	private getHtmlForWebview(webview: vscode.Webview): string {
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.context.extensionUri, 'out', 'file-not-found-app.mjs'),
		)
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Panel Title Goes Here</title>
			</head>
			<body>
				<div id="root"></div>
				<script type="module" src="${scriptUri.toString(true)}"></script>
			</body>
			</html>`
	}
}
