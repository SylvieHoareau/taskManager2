export default {
    methods: {
        validate(data) {
          // Vérifier que le champ `text` est rempli
          if (!data.text) {
            return false;
          }
    
          // Vérifier que la longueur du champ `text` est supérieure à 5 caractères
          if (data.text.length < 5) {
            return false;
          }
    
          // Si toutes les validations sont passées, renvoyer true
          return true;
        }
      }
  }