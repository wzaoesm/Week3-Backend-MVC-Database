
// ===== MAIN.JS =====
const ContactController = require('./controllers/ContactController');
const GroupController = require('./controllers/GroupController');
const ContactGroupController = require('./controllers/ContactGroupController');
const View = require('./views/view');

class AddressBookApp {
    constructor() {
        this.contactController = new ContactController();
        this.groupController = new GroupController();
        this.contactGroupController = new ContactGroupController();
        this.view = new View();
    }

    async run() {
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
            this.view.showError('No command provided. Use "help" for available commands.');
            return;
        }

        const command = args[0];
        const entity = args[1];

        try {
            switch (command) {
                case 'create':
                    await this.handleCreate(entity, args.slice(2));
                    break;
                case 'update':
                    await this.handleUpdate(entity, args.slice(2));
                    break;
                case 'delete':
                    await this.handleDelete(entity, args.slice(2));
                    break;
                case 'showContact':
                    await this.contactController.showAll();
                    break;
                case 'showGroups':
                    await this.groupController.showAll();
                    break;
                case 'help':
                    this.view.showHelp();
                    break;
                default:
                    this.view.showError(`Unknown command: ${command}`);
            }
        } catch (error) {
            this.view.showError(`Application error: ${error.message}`);
        }
    }

    async handleCreate(entity, args) {
        switch (entity) {
            case 'Contact':
                if (args.length !== 4) {
                    this.view.showError('Usage: create Contact <name> <phoneNumber> <company> <email>');
                    return;
                }
                await this.contactController.create(args[0], args[1], args[2], args[3]);
                break;
            case 'Groups':
                if (args.length !== 1) {
                    this.view.showError('Usage: create Groups <groupName>');
                    return;
                }
                await this.groupController.create(args[0]);
                break;
            case 'ContactGroups':
                if (args.length !== 2) {
                    this.view.showError('Usage: create ContactGroups <contactId> <groupId>');
                    return;
                }
                await this.contactGroupController.create(args[0], args[1]);
                break;
            default:
                this.view.showError(`Unknown entity: ${entity}`);
        }
    }

    async handleUpdate(entity, args) {
        switch (entity) {
            case 'Contact':
                if (args.length !== 5) {
                    this.view.showError('Usage: update Contact <id> <name> <phoneNumber> <company> <email>');
                    return;
                }
                await this.contactController.update(args[0], args[1], args[2], args[3], args[4]);
                break;
            case 'Groups':
                if (args.length !== 2) {
                    this.view.showError('Usage: update Groups <id> <groupName>');
                    return;
                }
                await this.groupController.update(args[0], args[1]);
                break;
            case 'ContactGroups':
                if (args.length !== 3) {
                    this.view.showError('Usage: update ContactGroups <id> <contactId> <groupId>');
                    return;
                }
                await this.contactGroupController.update(args[0], args[1], args[2]);
                break;
            default:
                this.view.showError(`Unknown entity: ${entity}`);
        }
    }

    async handleDelete(entity, args) {
        switch (entity) {
            case 'Contact':
                if (args.length !== 1) {
                    this.view.showError('Usage: delete Contact <id>');
                    return;
                }
                await this.contactController.delete(args[0]);
                break;
            case 'Groups':
                if (args.length !== 1) {
                    this.view.showError('Usage: delete Groups <id>');
                    return;
                }
                await this.groupController.delete(args[0]);
                break;
            case 'ContactGroups':
                if (args.length !== 1) {
                    this.view.showError('Usage: delete ContactGroups <id>');
                    return;
                }
                await this.contactGroupController.delete(args[0]);
                break;
            default:
                this.view.showError(`Unknown entity: ${entity}`);
        }
    }
}

// Run the application
if (require.main === module) {
    const app = new AddressBookApp();
    app.run().catch(console.error);
}