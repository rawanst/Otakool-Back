module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user: String,
        anime: String,
        note: Number,
        commentaire: String
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Avis = mongoose.model("avis", schema);
    return Avis;
};