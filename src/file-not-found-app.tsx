import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { WebviewApi } from 'vscode-webview'
const vscode: WebviewApi<unknown> = acquireVsCodeApi()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div>
            This is a custom text editor.
        </div>
		<button onClick={() => vscode.postMessage('delete')}>
			Click me
		</button>
	</StrictMode>,
)
