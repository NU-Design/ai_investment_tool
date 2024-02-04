import os

from llama_index.llms import OpenAI
from llama_index import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from IPython.display import Markdown, display
from dotenv import load_dotenv
from llama_index.vector_stores import AstraDBVectorStore


def store_data_in_db():
    # 加载环境变量
    load_dotenv()

    # 从环境变量获取数据库配置
    ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
    ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")

    # 初始化AstraDB存储
    astra_db_store = AstraDBVectorStore(
        token=ASTRA_DB_APPLICATION_TOKEN,
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        collection_name="test",  # 替换为你的集合名称
        embedding_dimension=1536,  # 根据你使用的模型可能需要调整
    )

    # 假设你从某个地方获取的文本已保存到"./data"目录下的文件中
    documents = SimpleDirectoryReader("./data").load_data()

    # 创建存储上下文
    storage_context = StorageContext.from_defaults(vector_store=astra_db_store)

    # 构建索引并将文档存储到Astra DB
    # 注意: 这一步实际上是在为文档创建向量表示并存储这些向量
    # 如果你只想简单地存储文档数据，可能需要调整这一步
    index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)

    print("文档已成功存储到数据库。")


# 如果这是一个独立脚本，直接调用函数
if __name__ == "__main__":
    store_data_in_db()
