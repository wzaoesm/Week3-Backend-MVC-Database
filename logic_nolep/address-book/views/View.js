// ===== VIEWS/VIEW.JS =====
class View {
    showSuccess(message) {
        console.log(`\n✅ SUCCESS: ${message}\n`);
    }

    showError(message) {
        console.log(`\n❌ ERROR: ${message}\n`);
    }

    showInfo(message) {
        console.log(`\nℹ️  INFO: ${message}\n`);
    }

    showContacts(contacts) {
        console.log('\n📋 CONTACTS LIST:');
        console.log('================');
        
        const formattedContacts = contacts.map(contact => ({
            ID: contact.id,
            Name: contact.name,
            Phone: contact.phoneNumber,
            Company: contact.company || 'N/A',
            Email: contact.email,
            Groups: contact.groups || 'No groups'
        }));

        console.table(formattedContacts);
        console.log(`\nTotal contacts: ${contacts.length}\n`);
    }

    showGroups(groups) {
        console.log('\n👥 GROUPS LIST:');
        console.log('===============');
        
        const formattedGroups = groups.map(group => ({
            ID: group.id,
            'Group Name': group.groupName,
            Contacts: group.contacts || 'No contacts'
        }));

        console.table(formattedGroups);
        console.log(`\nTotal groups: ${groups.length}\n`);
    }

    showHelp() {
        console.log(`
📚 ADDRESS BOOK - HELP
=====================

CONTACT COMMANDS:
• node main.js create Contact <name> <phoneNumber> <company> <email>
• node main.js update Contact <id> <name> <phoneNumber> <company> <email>
• node main.js delete Contact <id>
• node main.js showContact

GROUP COMMANDS:
• node main.js create Groups <groupName>
• node main.js update Groups <id> <groupName>
• node main.js delete Groups <id>
• node main.js showGroups

CONTACT-GROUP ASSOCIATION COMMANDS:
• node main.js create ContactGroups <contactId> <groupId>
• node main.js update ContactGroups <id> <contactId> <groupId>
• node main.js delete ContactGroups <id>

OTHER COMMANDS:
• node main.js help

EXAMPLES:
• node main.js create Contact "John Doe" "081234567890" "ABC Corp" "john@example.com"
• node main.js create Groups "Family"
• node main.js create ContactGroups 1 1
• node main.js showContact
• node main.js showGroups

NOTES:
- Phone numbers and emails must be unique
- Deleting a group will also remove all contact associations with that group
- Use quotes for names/values that contain spaces
        `);
    }
}

module.exports = View;