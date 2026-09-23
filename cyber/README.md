# Cyber Lab: Brute-Force Detection & Purple Team Exercise

**Faced with a highly restricted local host environment lacking root privileges and access to traditional hypervisors (VirtualBox/QEMU), I pivoted strategies to execute a user-space deployment. I established a custom Python virtual environment sandbox, generated simulated infrastructure telemetry, and engineered a Python-based detection parser to identify automated brute-force authentication attacks based on threshold analysis.**

---

## What I Engineered & Portfolio Value

| Security Domain | What I Engineered | Portfolio Value |
|----------------|---------------------|-----------------|
| **System Resiliency** | Bypassed root/firewall constraints using Python venv | Resourcefulness and runtime agility |
| **Detection Engineering** | Programmed an automated threshold-based parser | Proves core log analysis capabilities |
| **Incident Response** | Engineered a dynamic text-based firewall blocklist | Demonstrates remediation knowledge |
| **Defensive Engineering** | Implemented signature scanning to defeat file obfuscation | To demonstrate an advanced security mindset |

---

## Full Purple Team Workflow Completed

**Red Team (Offense):** Deployed a defense evasion tactic by renaming the auth log (`mv auth.log system_config.bak`) to hide malicious activity from naive filename-based detectors.

**Vulnerability Identified:** The defense relied on hardcoded filenames — a brittle assumption that fails under basic evasion.

**Blue Team (Defense):** Developed a **content-based heuristic scanner** that inspects file contents (signatures, entropy, structure) rather than trusting filenames, defeating the evasion and restoring detection capability.

---

## Project Structure

```
cyber/
├── vms/
│   ├── detect_bruteforce.py    # Threshold-based brute-force parser
│   └── banned_ips.txt          # Dynamic blocklist output
├── iso/
│   └── index.html              # Simulated infrastructure telemetry
└── README.md
```

---

## Key Takeaways

- **Constraints drive creativity** - Lack of root/sudo forced a user-space architecture that's actually more portable.
- **Detection must be content-aware** - Filename-based detection is trivial to evade; content-based heuristics raise the bar significantly.
- **Purple Team mindset** - Building the attack *and* the defense teaches you where assumptions break before an adversary finds them.