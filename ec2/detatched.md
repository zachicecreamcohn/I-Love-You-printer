H into your server.
Start a new tmux session by running tmux new -s my_session.
Run your script: npx tsx watch main.ts
Detach from the tmux session by pressing Ctrl+b followed by d.
Your script will continue to run in the tmux session. You can later reattach to this session with tmux attach -t my_session to check on your script's progress.