### Project Tasks Manager Powered by React and Firebase
<p align="center">
  <img src="https://github.com/rachnaban/project-task-manager/blob/master/Main%20Screen.png" alt="Project Tasks Manager using React and Firebase"/>
</p>
A simple interface to manage project tasks by a project manager. This is useful in stand-up meetings. Easy to assign new tasks to the team members and tracking the progress of the tasks.
The workflow starts after Login with Google Auth.
After successful login, all projects landing screen appears. New project can be created with the help of a handy button , which opens a Modal to enter some basic name and description of the project.After submitting this modal, the new project card is seen on the page. On this card, we have a link to add members to project. This link navigates us to specific project details page. We get to see members and tasks assigned to them.Members and their tasks are arranged in cards. Also, every field here is editable, we can update anything, task status can be modified too.Also delete option is provided on hover over the cards.In the backend, firebase is taking care of database.

JIRA_BASE_URL=https://yourdomain.atlassian.net
JIRA_API_TOKEN=your_jira_api_token
JIRA_EMAIL=your_email@company.com

GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key

pip install requests openai python-dotenv rich

import requests
import openai
import os
from dotenv import load_dotenv
from rich import print
from rich.console import Console
from rich.table import Table

load_dotenv()

# Load credentials
JIRA_BASE = os.getenv("JIRA_BASE_URL")
JIRA_EMAIL = os.getenv("JIRA_EMAIL")
JIRA_TOKEN = os.getenv("JIRA_API_TOKEN")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

console = Console()

def get_board_id(board_name):
    url = f"{JIRA_BASE}/rest/agile/1.0/board"
    response = requests.get(url, auth=(JIRA_EMAIL, JIRA_TOKEN))
    for board in response.json()["values"]:
        if board["name"] == board_name:
            return board["id"]
    raise Exception("Board not found.")

def get_active_sprint(board_id):
    url = f"{JIRA_BASE}/rest/agile/1.0/board/{board_id}/sprint?state=active"
    response = requests.get(url, auth=(JIRA_EMAIL, JIRA_TOKEN)).json()
    return response["values"][0]["id"]

def get_issues(sprint_id):
    url = f"{JIRA_BASE}/rest/agile/1.0/sprint/{sprint_id}/issue"
    response = requests.get(url, auth=(JIRA_EMAIL, JIRA_TOKEN)).json()
    return response["issues"]

def get_pr_status(issue_key):
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    url = f"https://api.github.com/search/issues?q={issue_key}+type:pr"
    res = requests.get(url, headers=headers).json()
    pr_data = []
    for item in res.get("items", []):
        pr_data.append({
            "url": item["html_url"],
            "state": item["state"]
        })
    return pr_data

def summarize_with_openai(data):
    prompt = f"""
    This is data from an active sprint. Provide a daily standup summary for each user:
    {data}
    """
    res = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    return res['choices'][0]['message']['content']

def generate_standup(board_name):
    board_id = get_board_id(board_name)
    sprint_id = get_active_sprint(board_id)
    issues = get_issues(sprint_id)

    summary_data = []

    for issue in issues:
        key = issue["key"]
        fields = issue["fields"]
        assignee = fields["assignee"]["displayName"] if fields["assignee"] else "Unassigned"
        status = fields["status"]["name"]
        title = fields["summary"]

        pr_info = get_pr_status(key)
        summary_data.append({
            "key": key,
            "title": title,
            "assignee": assignee,
            "status": status,
            "pr": pr_info
        })

    # Display table
    table = Table(title="Jira Standup Summary")
    table.add_column("Assignee", style="cyan")
    table.add_column("Issue", style="magenta")
    table.add_column("Status")
    table.add_column("PR")

    for item in summary_data:
        pr_state = ", ".join([f"{pr['state']} ({pr['url']})" for pr in item["pr"]]) or "No PR"
        table.add_row(item["assignee"], f"{item['key']}: {item['title']}", item["status"], pr_state)

    console.print(table)

    # GenAI summary
    ai_summary = summarize_with_openai(summary_data)
    console.print("[bold green]\nGenAI Summary:[/bold green]")
    console.print(ai_summary)

if __name__ == "__main__":
    board = input("Enter Jira board name: ")
    generate_standup(board)


